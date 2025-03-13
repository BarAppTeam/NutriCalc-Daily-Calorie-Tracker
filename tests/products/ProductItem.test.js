import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import ProductItem from '../../src/components/products/ProductItem';

describe('ProductItem', () => {
  const mockProduct = {
    productId: 1,
    productName: 'Test Product',
    productAmount: 2.5,
    totalCalories: 250
  };

  const mockOnDelete = jest.fn();

  beforeEach(() => {
    act(() => {
      const container = document.createElement('div');
      document.body.appendChild(container);
      ReactDOM.render(<ProductItem product={mockProduct} onDelete={mockOnDelete} />, container);
    });
  });

  it('renders product information correctly', () => {
    const productText = document.querySelector('.product-info strong').textContent;
    const productInfo = document.querySelector('.product-info .ant-typography-secondary').textContent;
    expect(productText).toBe('Test Product');
    expect(productInfo).toContain('2.5');
    expect(productInfo).toContain('250');
  });

  it('calls onDelete when delete button is clicked', () => {
    const deleteButton = document.querySelector('.delete-button');
    act(() => {
      deleteButton.click();
    });
    expect(mockOnDelete).toHaveBeenCalledWith(mockProduct.productId);
  });

  it('has correct accessibility attributes', () => {
    const productCard = document.querySelector('.product-card');
    const deleteButton = document.querySelector('.delete-button');
    expect(productCard.getAttribute('aria-label')).toBe('Product: Test Product');
    expect(deleteButton.getAttribute('aria-label')).toBe('Delete Test Product');
  });
});