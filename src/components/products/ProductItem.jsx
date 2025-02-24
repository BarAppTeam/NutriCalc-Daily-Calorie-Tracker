import React from 'react';
import { Card, Button, Typography, Space } from 'antd';
import PropTypes from 'prop-types';
import StringBuilder from '../../../utils/StringBuilder';
import './ProductItem.css';

const { Text } = Typography;

function ProductItem({ product, onDelete }) {
  const { productName, productAmount, totalCalories, productId } = product;
  const handleDelete = () => onDelete(productId);

  return (
    <Card
      className="product-card"
      hoverable
      aria-label={`Product: ${productName}`}
    >
      <Space direction="vertical" size="small" className="product-info">
        <Text strong>{productName}</Text>
        <Text type="secondary">
          {new StringBuilder().formatProductInfo(productName, productAmount, totalCalories)}
        </Text>
      </Space>
      <Button
        type="primary"
        danger
        onClick={handleDelete}
        aria-label={`Delete ${productName}`}
        size="middle"
        shape="round"
        className="delete-button"
      >
        Delete
      </Button>
    </Card>
  );
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    productId: PropTypes.number.isRequired,
    productName: PropTypes.string.isRequired,
    productAmount: PropTypes.number.isRequired,
    totalCalories: PropTypes.number.isRequired
  }).isRequired,
  onDelete: PropTypes.func.isRequired
};

export default ProductItem;