import React, { Component } from 'react';
import M from 'materialize-css';
import ShowProductsComponent from "./components/ShowProducts.component";
import './App.css';


class App extends Component{
  render(){
    return(
      <div>
        <ShowProductsComponent/>
      </div>
    )
  }
}

export default App;
