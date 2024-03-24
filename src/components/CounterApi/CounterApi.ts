import Squid from "Squid";

const useCounterApi = () => {
  const [
    counter,
    setCounter
  ] = Squid.useGlobalState(0, "first")

  const [
    counter2,
    setCounter2
  ] = Squid.useGlobalState(1, "second")

  return {
    counter,
    counter2,
    handleCounterButtonClick: () => {
      setCounter(counter + 1)
      setCounter2(counter2 * 2)
    }
  }
}

export default useCounterApi
