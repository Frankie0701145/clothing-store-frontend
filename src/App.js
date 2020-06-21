import React, { Component } from 'react';
import 'materialize-css';
import ShowProductsComponent from "./components/ShowProducts.component";
import AddProduct from "./components/AddProduct.component";
import AddSubTypeCombination from './components/AddSubTypeCombination.component';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import './App.css';


class App extends Component{
  render(){
    return(
      <Router>
        
          <div className="navbar-fixed">
            <nav>
              <div className="nav-wrapper container">
                <NavLink to="/" className="brand-logo">Clothing Inventory</NavLink>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                  <li><NavLink to="/">Inventory</NavLink></li>
                  <li><NavLink to="/add_product">Add Product</NavLink></li>
                </ul>
              </div>
            </nav>
          </div>

          <div>
            <Switch>
              <Route path="/" component={ShowProductsComponent} exact></Route>
              <Route path="/add_product" component={AddProduct}></Route>
              <Route path="/addSubTypeCombination/:id/:product_name" component={AddSubTypeCombination}></Route>
            </Switch>
          </div> 
     </Router>
    )
  }
}

export default App;
