import axios from "axios";
import React, { Component } from 'react';
import Select from 'react-select';
let M = require("materialize-css");

class AddSubTypeCombination extends Component {

    constructor(props){
        super(props)
        this.state = {
            sub_types: [],
            selectedOptions: null
        }
    }

    selectOptions = (sub_types)=>{   
            if(this.state.sub_types == null){
                return (
                    <div className="preloader-wrapper active">
                        <div className="spinner-layer spinner-red-only">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div><div className="gap-patch">
                                <div className="circle"></div>
                            </div><div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                        </div>
                    </div>
                )
            }else if(this.state.sub_types.length < 1){
                return (
                    <div>
                        <h3>Add Subtypes</h3>
                    </div>
                )
            }else{
                return(
                    <div>
                        <label>Select sub types</label>
                        <Select
                            options={this.state.sub_types}
                            isMulti={true}
                            isSearchable={true}
                            onChange={this.handleChange}
                         />
                         
                    </div>
                    
                )
            }
    }     
    
    handleChange = (selectedOptions)=>{
        this.setState({...this.state, selectedOptions});
    }
    
    submit = (e)=>{
        e.preventDefault()
        let quantity =e.target.quantity.value;
        let price = e.target.price.value;
        if(this.state.selectedOptions == null){
            M.toast({html: "Please select at least one sub type"});
        }else{
            let sub_type_ids = this.state.selectedOptions.map((selectedOption)=>{
                return selectedOption.value
            });
            let payload = {
                  type: {
                    quantity: quantity,
                    price: price,
                    sub_type_ids: sub_type_ids
                }
            }
            axios.post(`/products/${this.props.match.params.id}/types`, payload).then((response)=>{
                this.props.history.push("/");
                M.toast({html: "Sub types combination added successful"});
            }).catch((err)=>{
                console.error(err);
                let errors = err.response.data.errors;
                errors.forEach((err)=>{
                    M.toast({html: err})
                });
            })
        }
    }

    render(){
        this.selectOptions(this.state.sub_types);
        return (
            <div className="container">
                <div className="row">
                    <h4>{this.props.match.params.product_name}</h4>
                </div>
                <div className="row">
                    <div className="container">
                        <div className="col s10">
                            <form onSubmit={this.submit}>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <input id="quantity" type="number" name="quantity" className="validate" required/>
                                        <label htmlFor="first_name">Quantity</label>
                                    </div>
                                    <div className="input-field col s6">
                                        <input id="last_name" type="number" name="price" className="validate" required/>
                                        <label htmlFor="last_name">Price</label>
                                    </div>
                                </div>
                                <div className="row">       
                                        {
                                                this.selectOptions(this.state.sub_types)
                                        }
                                </div>
                                <div className="row">
                                    <button className="btn waves-effect waves-light light-blue darken-4" type="submit" name="action" disabled={this.props.loading}>
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount(){
        axios.get(`/sub_types/${this.props.match.params.id}`).then((response)=>{
            let optionsSubType=[];
            let option;
            response.data.sub_types.forEach(sub_type => {
                option= {
                    value: sub_type.id,
                    label: `${sub_type.name}: ${sub_type.value}`
                }
                optionsSubType.push(option)
            });
            this.setState({...this.state, sub_types: optionsSubType });
            console.log(this.state.sub_types);
        }).catch((err)=>{
            console.error(err);
        });
        var elems = document.querySelectorAll('select');
        M.FormSelect.init(elems, {});
    }
}

export default AddSubTypeCombination;