import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";

interface PageItem {
  url: string;
  component: React.FC<any>;
}

const pages: PageItem[] = [
  {
    url: "",
    component: Home
  }
];

const App = () => {
  return (
    <Router>
      <Switch>
        {pages.map(page => (
          <Route>
            <page.component />
          </Route>
        ))}
      </Switch>
    </Router>
  );
};

export default App;
