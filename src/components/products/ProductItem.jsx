import React from 'react';
import { Card, Button, Typography, Space } from 'antd';
import PropTypes from 'prop-types';
import StringBuilder from '../../utils/StringBuilder';
import '../../styles/components/products/ProductItem.css';
import { useTranslation } from '../../contexts/LanguageContext';

const { Text } = Typography;

function ProductItem({ product, onDelete }) {
  const { translate } = useTranslation();
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
          {translate('summary.product_line').replace("{name}", productName).replace("{amount}", productAmount).replace("{calories}", totalCalories.toFixed(2))}
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
        {translate('product.list.delete')}
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