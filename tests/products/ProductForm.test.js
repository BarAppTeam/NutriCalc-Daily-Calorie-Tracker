import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import ProductForm from '../../src/components/products/ProductForm';

function simulateInputChange(inputElement, value) {
  act(() => {
    if (!inputElement) {
      throw new Error('Input element not found');
    }

    // Create an input event that matches Ant Design's expected format
    const event = new Event('input', { bubbles: true });
    const changeEvent = new Event('change', { bubbles: true });

    // Set up the event target properties to match Ant Design's expected structure
    const targetProps = {
      value: value,
      type: 'number',
      min: '0'
    };

    Object.defineProperty(event, 'target', { value: targetProps });
    Object.defineProperty(changeEvent, 'target', { value: targetProps });

    // Dispatch both events to properly trigger Ant Design's handlers
    inputElement.dispatchEvent(event);
    inputElement.dispatchEvent(changeEvent);
  });
}

describe('ProductForm', () => {
  const mockOnAdd = jest.fn();

  beforeEach(() => {
    act(() => {
      const container = document.createElement('div');
      document.body.appendChild(container);
      ReactDOM.render(<ProductForm onAdd={mockOnAdd} />, container);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders all form fields correctly', () => {
    expect(document.querySelector('input[placeholder="Enter product name"]')).toBeTruthy();
    expect(document.querySelector('input[placeholder="Enter amount in kg"]')).toBeTruthy();
    expect(document.querySelector('input[placeholder="Enter calories per kg"]')).toBeTruthy();
    expect(document.querySelector('button[type="submit"]')).toBeTruthy();
  });

  it('shows validation errors for empty required fields', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    act(() => {
      ReactDOM.render(<ProductForm onAdd={mockOnAdd} />, container);
    });

    const form = container.querySelector('form');
    await act(async () => {
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      // Add a longer delay to ensure form validation completes
      await new Promise(resolve => setTimeout(resolve, 500));
    });

    const errorMessages = container.querySelectorAll('.ant-form-item-explain-error');
    expect(errorMessages.length).toBe(3);
    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  it('calculates total calories correctly and submits form', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    act(() => {
      ReactDOM.render(<ProductForm onAdd={mockOnAdd} />, container);
    });
    const productName = container.querySelector('input[placeholder="Enter product name"]');
    const amount = container.querySelector('input[placeholder="Enter amount in kg"]');
    const caloriesPerKg = container.querySelector('input[placeholder="Enter calories per kg"]');

    await act(async () => {
      simulateInputChange(productName, 'Apple');
      simulateInputChange(amount, '0.5');
      simulateInputChange(caloriesPerKg, '520');
      const submitButton = container.querySelector('button[type="submit"]');
      submitButton.click();
    });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(mockOnAdd).toHaveBeenCalledWith({
        productName: 'Apple',
        productAmount: 0.5,
        caloriesPerKg: 520,
        totalCalories: 260
      });
    });
  });

  it('resets form after successful submission', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    act(() => {
      ReactDOM.render(<ProductForm onAdd={mockOnAdd} />, container);
    });
    const productName = container.querySelector('input[placeholder="Enter product name"]');
    const amount = container.querySelector('input[placeholder="Enter amount in kg"]');
    const caloriesPerKg = container.querySelector('input[placeholder="Enter calories per kg"]');

    await act(async () => {
      simulateInputChange(productName, 'Banana');
      simulateInputChange(amount, '0.3');
      simulateInputChange(caloriesPerKg, '890');
      const submitButton = container.querySelector('button[type="submit"]');
      submitButton.click();
    });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(productName.value).toBe('');
      expect(amount.value).toBe('');
      expect(caloriesPerKg.value).toBe('');
    });
  });

  it('prevents negative values in numeric inputs', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    act(() => {
      ReactDOM.render(<ProductForm onAdd={mockOnAdd} />, container);
    });

    const amount = container.querySelector('input[placeholder="Enter amount in kg"]');
    console.log(amount);
    const caloriesPerKg = container.querySelector('input[placeholder="Enter calories per kg"]');

    await act(async () => {
      simulateInputChange(amount, '-1');
      simulateInputChange(caloriesPerKg, '-100');
      // Add a delay to allow form validation to complete
      await new Promise(resolve => setTimeout(resolve, 100));
    });


    const amountAfter = container.querySelector('input[placeholder="Enter amount in kg"]');
    console.log({ before: amount.value, after: amountAfter.value });


    expect(amount.value).toBe('0');
    expect(caloriesPerKg.value).toBe('0');
  });
});