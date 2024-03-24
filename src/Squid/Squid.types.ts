export type HtmlTag = keyof HTMLElementTagNameMap;

export type Options<TElementTag extends HtmlTag> = Partial<HTMLElementTagNameMap[TElementTag]>;

export type Attributes = Record<string, string>;

export type Listeners = Record<string, Function>;

export type SetValue<S = any> = (v: S) => void;

export type StateTuple<S = any> = [S, SetValue<S>];
