import React, { Component } from 'react';
import { Form, Input, Button,Space  } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import axios from "axios";
let M = require("materialize-css");

class AddProduct extends Component {
    
    onFinish = (values)=>{
        let payload = {
            product: values
        }
        axios.post("/products", payload).then(()=>{
            this.props.history.push("/");
            M.toast({html: "Product Added"})
        }).catch((err)=>{
            let errors = err.response.data.errors;
            console.error(errors);
            errors.forEach((err)=>{
                M.toast({html: err});
            });   
        });
    }
    

    render(){
        

        return(
            <div className="container">
                <Form
                    onFinish={this.onFinish}
                    name="product"
                >
                    <Form.Item
                        label="Product Name"
                        name="product_name"
                        rules={[{ required: true, message: "Product Name is required" }]}
                    >
                        <Input/>
                    </Form.Item>

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
        )
    }
}

export default AddProduct;