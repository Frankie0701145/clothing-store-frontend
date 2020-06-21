import React, {Component} from 'react';
import axios from "axios";
import  './ShowProducts.component.css';
import { NavLink } from 'react-router-dom';

class ShowProducts extends Component {

    constructor(props){
        super(props)
        this.state = {
            products: []
        }
    }

    types = (types)=>{
        return types.map((type)=>{
           return(
                <tr key={type.id}>
                    <td>
                        {
                            this.subType(type.sub_types)
                        }
                    </td>
                    <td>
                        {type.price}
                    </td>
                    <td>
                        {type.quantity}
                    </td>
                </tr>
           ) 
        });
    }
    subType = (subTypes)=>{
        return subTypes.map((subType, index)=>{
            return (
                <span key={subType.id}>
                    {subType.name}  : {subType.value} {",   "}
                </span>
            )
        });
    }
    

    render(){
        if(this.state.products.length>0){
            return (
                <div className="container">
                    {
                        
                        this.state.products.map((product)=>{
                            return (
                                <div className="container" key={product.id}>
                                    <div className="row">
                                        <div className="col s12">
                                            {/* Heading */}
                                            <div className="row valign-wrapper">

                                                <div className="col s7">
                                                    <h4>
                                                        {product.product_name}
                                                    </h4>
                                                </div>
                                                <div className="col s5 ">
                                                    <NavLink className="waves-effect waves-light btn" to={`/addSubTypeCombination/${product.id}/${product.product_name}`}>
                                                        Add SubType Combo
                                                    </NavLink>
                                                    
                                                </div>

                                            </div>

                                            <h7>
                                                Total Units: {product.total_units}
                                            </h7>
                                            {/* Table */}
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Sub-type</th>
                                                        <th>Price</th>
                                                        <th>Quantity</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.types(product.types)
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>      
                                </div>
                            )
                        })
                    }
                </div>
            );
        }else{
            return (
                <div className='container center-align' style={{margin: "10px !important"}}>
                        <h4>No Products For Now!</h4>
                </div>
            )
        }
        
    }

    componentDidMount(){
        axios.get("/products/types/sub_types").then((res)=>{
            this.setState({...this.state,products: res.data});
        }).catch((err)=>{
            console.error(err);
        })
    }
}

export default ShowProducts;