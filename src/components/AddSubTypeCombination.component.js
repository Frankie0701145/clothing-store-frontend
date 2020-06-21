import axios from "axios";
import React, { Component } from 'react';
import Select from 'react-select';
import FormSubType from "./modal/formSubType";
let M = require("materialize-css");

class AddSubTypeCombination extends Component {

    constructor(props){
        super(props)
        this.state = {
            sub_types: [],
            selectedOptions: null
        }
    };

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
                            styles={{
                                // Fixes the overlapping problem of the component
                                menu: provided => ({ ...provided, zIndex: 9999 })
                            }}
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
                                    <div className="col">
                                        <button className="btn waves-effect waves-light light-blue darken-4" type="submit" name="action">
                                            Combine
                                        </button>
                                    </div>
                                </div>
                            </form>

                            <div className="row">
                                     <div className="col offset s8">
                                        <button  data-target="modal1" className="btn modal-trigger">
                                            Add Sub Types
                                        </button>
                                    </div>
                            </div>

                            {/* Modal Structure */}
                            <FormSubType product_id={this.props.match.params.id} addSubTypeOptionState={this.addSubTypeOptionState}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    //method to be passed to the FormSubType component as a prop
    modalAddSubType = (sub_types)=>{
        //add the sub_types options to the state
        this.addSubTypeOptionState(sub_types);
        //open a toast
        M.toast({html: "Sub Type Added Successfully"});
    }

    // Add the sub_types and by the modal to the state
    addSubTypeOptionState = (sub_types)=>{
        let optionsSubType=[];
        //create the option passed to the Select component
        optionsSubType = sub_types.map((sub_type)=>{
            return {
                value: sub_type.id,
                label: `${sub_type.name}: ${sub_type.value}`
            }
        })
        //populate the option to the state
        let new_sub_types = [...optionsSubType,...this.state.sub_types ]
        this.setState({...this.state, sub_types: new_sub_types});
    }

    componentDidMount(){
        //fetch sub_types
        axios.get(`/sub_types/${this.props.match.params.id}`).then((response)=>{
            //add sub_types to the state 
            this.addSubTypeOptionState(response.data.sub_types);
        }).catch((err)=>{
            console.error(err);
        });
        let elemsModal = document.querySelectorAll('.modal');
         M.Modal.init(elemsModal, {});
    }
}

export default AddSubTypeCombination;

// data-target="modal1" className="btn modal-trigger"