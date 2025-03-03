import React from 'react';
import { Typography, Card } from 'antd';
import PropTypes from 'prop-types';
import '../../styles/components/calories/TotalCalories.css';
import { useTranslation } from '../../contexts/LanguageContext';

const { Title } = Typography;

function TotalCalories({ products }) {
  const { translate } = useTranslation();
  const totalCalories = products.reduce((sum, product) => sum + product.totalCalories, 0);
  return (
    <Card className="total-calories-card" aria-label="Total calories summary">
      <Title level={3} className="total-calories-title">
        {translate('summary.total').replace('{calories}', totalCalories.toFixed(2))}
      </Title>
    </Card>
  );
}

TotalCalories.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      totalCalories: PropTypes.number.isRequired
    })
  ).isRequired
};

export default TotalCalories;