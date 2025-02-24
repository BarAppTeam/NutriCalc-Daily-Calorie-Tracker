import React, { useState } from 'react';
import { Form, Input, Button, InputNumber, Card } from 'antd';
import PropTypes from 'prop-types';
import './ProductForm.css';

function ProductForm({ onAdd }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    const totalCalories = values.productAmount * values.caloriesPerKg;
    const product = {
      ...values,
      totalCalories
    };
    onAdd(product);
    form.resetFields();
    setLoading(false);
  };

  return (
    <Card className="product-form">
      <Form
        form={form}
        name="productForm"
        onFinish={onFinish}
        layout="vertical"
        requiredMark="optional"
      >
        <Form.Item
          label="Product Name"
          name="productName"
          rules={[{ required: true, message: 'Please input the product name!' }]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>

        <Form.Item
          label="Amount (kg)"
          name="productAmount"
          rules={[{ required: true, message: 'Please input the amount!' }]}
        >
          <InputNumber
            min={0}
            step={0.1}
            placeholder="Enter amount in kg"
            className="product-form-input"
          />
        </Form.Item>

        <Form.Item
          label="Calories per kg"
          name="caloriesPerKg"
          rules={[{ required: true, message: 'Please input calories per kg!' }]}
        >
          <InputNumber
            min={0}
            step={1}
            placeholder="Enter calories per kg"
            className="product-form-input"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
          >
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

ProductForm.propTypes = {
  onAdd: PropTypes.func.isRequired
};

export default ProductForm;