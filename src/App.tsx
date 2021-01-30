import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

import './App.css';
import './variables.css'
import Header from "./Components/Header/index"
import Home from "./Pages/Home"
import Logs from "./Pages/Logs/index"
import Audit from "./Pages/Audit/index";
import LogsProvider from "./Context/Logs";


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <LogsProvider>
            <Route component={Home} path="/" exact/>
            <Route component={Logs} path="/logs" exact/>
            <Route component={Audit} path="/audit" exact/>
          </LogsProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
