import { h1 } from "Squid";
import useCounterApi from "components/CounterApi";

const CounterDisplay = () => {
  const {
    counter,
    counter2,
  } = useCounterApi();

  return (
    h1({
      className: "text-danger" }
    )(`count is ${counter} ${counter2}`)
  )
}

export default CounterDisplay
