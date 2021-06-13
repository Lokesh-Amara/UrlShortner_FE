import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import MyUrls from "./components/MyUrls";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route path="/url">
              <MyUrls />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
