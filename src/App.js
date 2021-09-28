import "bootstrap/dist/css/bootstrap.min.css";
import Categories from "./components/View/categories.js";
import Expenditures from "./components/View/expenditures.js";
import Home from "./components/View/home.js";
import Navbar from "react-bootstrap/Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Navbar>
        <Navbar.Brand as={NavLink} to="/">Home</Navbar.Brand>
        <Navbar.Brand as={NavLink} to="/categories">Categories</Navbar.Brand>
        <Navbar.Brand as={NavLink} to="/expenditures">Expenditures</Navbar.Brand>
          {/* <NavLink to="./">Home</NavLink>
          <NavLink to="/categories">Categories</NavLink>
          <NavLink to="/expenditures">Expenditures</NavLink> */}
        </Navbar>

        <Switch>
          <Route path="/categories" component={Categories} />
          <Route path="/expenditures" component={Expenditures} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
