import axios from "axios";
import React, { Component } from 'react';
import { Form, Input, Button,Space  } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
let M = require("materialize-css");

class FormSubType extends Component {


    onFinish = (values)=>{
        
        let payload = {
            sub_types: {
                sub_types: values.sub_types
            }
        }
        
        axios.post(`/sub_types/${this.props.product_id}`, payload).then((response)=>{
            console.log()
            let sub_types = response.data.sub_types
            this.props.addSubTypeOptionState(sub_types);
            M.toast({html: "Sub Type Added Successfully"});
        }).catch((err)=>{
            let errors = err.response.data.errors;
            errors.forEach((err)=>{
                M.toast({html: err});
            });   
        });
    }

    render(){
        return (
            <div id="modal1" className="modal">
                <div className="modal-content">
                        <h6>Add Sub Types</h6>
                        <Form
                            onFinish={this.onFinish}
                            name="sub_types"
                        >
                                <Form.List name="sub_types">
                                    {(fields, { add, remove }) => {
                                        return (
                                            <div>
                                            {fields.map(field => (
                                                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, 'name']}
                                                    fieldKey={[field.fieldKey, 'name']}
                                                    rules={[{ required: true, message: 'Missing Name' }]}
                                                >
                                                    <Input placeholder="Color" />
                                                </Form.Item>
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, 'value']}
                                                    fieldKey={[field.fieldKey, 'value']}
                                                    rules={[{ required: true, message: 'Missing value' }]}
                                                >
                                                    <Input placeholder="Red" />
                                                </Form.Item>

                                                <MinusCircleOutlined
                                                    onClick={() => {
                                                    remove(field.name);
                                                    }}
                                                />
                                                </Space>
                                            ))}

                                            <Form.Item>
                                                <Button
                                                    type="dashed"
                                                    onClick={() => {
                                                        add();
                                                    }}
                                                    block
                                                >
                                                    <PlusOutlined /> Sub Types
                                                </Button>
                                            </Form.Item>
                                            </div>
                                        );
                                    }}
                                </Form.List>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                        </Form>
                </div>
                    <div className="modal-footer">
                        <button  className="modal-close waves-effect waves-green btn red">Close</button>
                    </div>
            </div>
        )
    }
}

export default FormSubType