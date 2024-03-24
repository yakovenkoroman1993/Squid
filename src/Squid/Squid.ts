import {
  Attributes,
  HtmlTag,
  Listeners,
  Options,
  SetValue,
  StateTuple
} from "./Squid.types";

class Squid {
  #statesCounter = -1

  #stateTuples: StateTuple[] = []

  #globalStateTuples: Record<string, StateTuple> = {}

  #app: Function | null = null

  render(app: Function) {
    document.body.append(app())
    this.#app = app
  }

  rerender() {
    this.#statesCounter = -1
    document.body.innerHTML = ""
    document.body.append(this.#app())
  }

  buildDom<TElementTag extends HtmlTag>(elementTag: TElementTag) {
    return (options: Options<TElementTag>) => (...children: (Node | string)[]) => {

      const target = document.createElement<TElementTag>(elementTag)

      const attributes = Object.fromEntries(
        Object
          .entries(options)
          .filter(([k, v]) => !k.startsWith("on"))
      ) as Attributes

      const listeners = Object.fromEntries(
        Object
          .entries(options)
          .filter(([k, v]) => k.startsWith("on"))
      ) as Listeners

      for (const [attributeName, value] of Object.entries(attributes)) {
        target.setAttribute(attributeName, value);
      }

      for (const [listenerName, listenerFn] of Object.entries(listeners)) {
        (target as any)[listenerName] = listenerFn;
      }

      children.map((child) => target.append(child))

      return target;
    }
  }

  buildRender<TElementTag extends HtmlTag>(elementTag: TElementTag) {
    return (input: any) => {
      if (typeof input === "object") {
        return this.buildDom<TElementTag>(elementTag)(input)
      }

      if (["function", "string"].includes(typeof input)) {
        return this.buildDom<TElementTag>(elementTag)({})(input)
      }

      throw new Error("Unknown input")
    }
  }

  useState<S>(defaultValue: S): StateTuple<S> {
    const index = ++this.#statesCounter;

    if (this.#stateTuples[index]) {
      return this.#stateTuples[index]
    }

    const setValue: SetValue<S> = (nextValue) => {
      this.#stateTuples[index][0] = nextValue
      this.rerender()
    }

    const tuple: StateTuple<S> = [defaultValue, setValue]

    this.#stateTuples.push(tuple)

    return tuple;
  }

  useGlobalState<S>(defaultValue: S, id: string): StateTuple<S> {
    if (this.#globalStateTuples[id]) {
      return this.#globalStateTuples[id]
    }

    const setValue: SetValue<S> = (nextValue) => {
      this.#globalStateTuples[id][0] = nextValue
      this.rerender()
    }

    const tuple: StateTuple<S> = [defaultValue, setValue]

    this.#globalStateTuples[id] = tuple;

    return tuple;
  }
}

const squid = new Squid();

export const div = squid.buildRender("div")

export const h1 = squid.buildRender("h1")
export const span = squid.buildRender("span")
export const p = squid.buildRender("p")
export const button = squid.buildRender("button")

export default squid;
