import "bootstrap/dist/css/bootstrap.min.css";
import Categories from "./components/View/categories.js";
import Expendituries from "./components/View/expendituries.js";
import Home from "./components/View/home.js";
import Navbar from "react-bootstrap/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Navbar>
          <Navbar.Brand href="./">Home</Navbar.Brand>
          <Navbar.Brand href="/categories">Categories</Navbar.Brand>
          <Navbar.Brand href="/expendituries">Expendituries</Navbar.Brand>
        </Navbar>
      
        <Switch>
          <Route path="/categories">
            <Categories />
          </Route>
          <Route path="/expendituries">
            <Expendituries />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
