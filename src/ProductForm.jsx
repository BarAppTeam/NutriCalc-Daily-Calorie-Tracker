import React from 'react';
import { Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';

export default function ProductForm({ onAdd }) {
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        const totalCalories = (values.productAmount * values.caloriesPer100g) / 100;
        const productId = Date.now();
        const product = { ...values, totalCalories, productId };

        onAdd(product);
        form.resetFields();
    };

    return (
        <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            className="product-form"
            aria-label="Add product form"
        >
            <Form.Item
                name="productName"
                label="Product Name"
                rules={[{ required: true, message: 'Please input the product name!' }]}
            >
                <Input 
                    placeholder="Enter product name" 
                    aria-label="Product name input"
                />
            </Form.Item>

            <Form.Item
                name="productAmount"
                label="Amount (in g)"
                rules={[{ required: true, message: 'Please input the amount!' }]}
            >
                <Input 
                    type="number" 
                    min={0} 
                    placeholder="Enter amount in grams"
                    aria-label="Product amount input"
                />
            </Form.Item>

            <Form.Item
                name="caloriesPer100g"
                label="Calories per 100g"
                rules={[{ required: true, message: 'Please input calories per 100g!' }]}
            >
                <Input 
                    type="number" 
                    min={0} 
                    placeholder="Enter calories per 100g"
                    aria-label="Calories per 100g input"
                />
            </Form.Item>

            <Form.Item>
                <Button 
                    type="primary" 
                    htmlType="submit"
                    aria-label="Add product button"
                >
                    Add Product
                </Button>
            </Form.Item>
        </Form>
    );
}

ProductForm.propTypes = {
    onAdd: PropTypes.func.isRequired
};
