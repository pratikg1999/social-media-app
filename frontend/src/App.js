import "./App.css";
import { Switch, Route } from "react-router-dom";
import LoginApp from "./containers/login/LoginApp";
import providerHOC from "./hoc/providerHoc";
import Dashboard from "./containers/dashboard/Dashboard";
import store from "./store";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={LoginApp} />
        <Route path="/" component={providerHOC(Dashboard, store)} />
        {/* <Route path="/profile" component={providerHOC(Dashboard, store)} /> */}
      </Switch>
    </div>
  );
}

export default App;
