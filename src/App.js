import React, { Component } from 'react';
import M from 'materialize-css';
import ShowProductsComponent from "./components/ShowProducts.component";
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import './App.css';


class App extends Component{
  render(){
    return(
      <Router>
        
          <div className="navbar-fixed">
            <nav>
              <div class="nav-wrapper">
                <NavLink to="/" class="brand-logo">Clothing Inventory</NavLink>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                  <li><NavLink to="#">Inventory</NavLink></li>
                  <li><NavLink to="#">Add Product</NavLink></li>
                  <li><NavLink to="#">JavaScript</NavLink></li>
                </ul>
              </div>
            </nav>
          </div>

          <div>
            <Switch>
              <Route path="/" component={ShowProductsComponent} exact></Route>
              <Route></Route>
              <Route></Route>
            </Switch>
          </div> 
     </Router>
    )
  }
}

export default App;
