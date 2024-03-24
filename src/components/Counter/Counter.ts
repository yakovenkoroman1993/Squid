import { div, button } from "Squid";
import useCounterApi from "components/CounterApi";

type Props = {
  label: string;
}

const Counter = (props: Props) => {
  const { label } = props;

  const {
    handleCounterButtonClick
  } = useCounterApi();

  return (
    div({
      className: "p-3"
    })(
      button({
        onclick: handleCounterButtonClick
      })(label)
    )
  )
}

export default Counter
