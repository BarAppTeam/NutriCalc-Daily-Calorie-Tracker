import React, { useState } from 'react';
import { Form, Input, Button, InputNumber, Card } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from '../../contexts/LanguageContext';
import './ProductForm.css';

function ProductForm({ onAdd }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { translate } = useTranslation();

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
    <Card className="product-form-card">
      <Form
        form={form}
        name="productForm"
        onFinish={onFinish}
        layout="vertical"
        requiredMark="optional"
        className="product-form-container"
      >
        <Form.Item
          label={translate('product.form.name')}
          name="productName"
          rules={[{ required: true, message: translate('product.form.name_required') }]}
        >
          <Input placeholder={translate('product.form.name_placeholder')} />
        </Form.Item>

        <Form.Item
          label={translate('product.form.amount')}
          name="productAmount"
          rules={[{ required: true, message: translate('product.form.amount_required') }]}
        >
          <InputNumber
            min={0}
            step={0.1}
            placeholder={translate('product.form.amount_placeholder')}
            className="product-form-input"
          />
        </Form.Item>

        <Form.Item
          label={translate('product.form.calories')}
          name="caloriesPerKg"
          rules={[{ required: true, message: translate('product.form.calories_required') }]}
        >
          <InputNumber
            min={0}
            step={1}
            placeholder={translate('product.form.calories_placeholder')}
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
            {translate('product.form.submit')}
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