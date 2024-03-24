import Squid, { div, span } from "Squid"
import CounterDisplay from "components/CounterDisplay"
import Counter from "components/Counter"
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => (
  div({
    className: "d-flex justify-content-between align-items-center p-5"
  })(
    CounterDisplay(),

    span("something text"),

    Counter({
      label: "Increase counter"
    })
  )
)

Squid.render(App)
