import React from 'react';
import { List, Empty } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';
import ProductItem from './ProductItem';
import PropTypes from 'prop-types';

export default function ProductList({ products, onEdit, onDelete }) {
    return (
        <List
            grid={{
                gutter: 16,
                xs: 1,
                sm: 1,
                md: 2,
                lg: 2,
                xl: 3,
                xxl: 3,
            }}
            dataSource={products}
            locale={{
                emptyText: <Empty
                    image={<ShoppingOutlined style={{ fontSize: 64 }} />}
                    description="No products added yet. Start by adding your first product!"
                />
            }}
            renderItem={product => (
                <List.Item key={product.productId}>
                    <ProductItem
                        product={product}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                </List.Item>
            )}
        />
    );
}

ProductList.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            productId: PropTypes.number.isRequired,
            productName: PropTypes.string.isRequired,
            productAmount: PropTypes.number.isRequired,
            totalCalories: PropTypes.number.isRequired
        })
    ).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

