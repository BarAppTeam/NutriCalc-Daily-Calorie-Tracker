import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import TotalCalories from '../../src/components/calories/TotalCalories';

describe('TotalCalories', () => {
  const mockProducts = [
    { totalCalories: 100 },
    { totalCalories: 200 },
    { totalCalories: 300 }
  ];

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders without crashing', () => {
    act(() => {
      const container = document.createElement('div');
      document.body.appendChild(container);
      ReactDOM.render(<TotalCalories products={mockProducts} />, container);
    });
    expect(document.querySelector('[aria-label="Total calories summary"]')).toBeTruthy();
  });

  it('calculates and displays the total calories correctly', () => {
    act(() => {
      const container = document.createElement('div');
      document.body.appendChild(container);
      ReactDOM.render(<TotalCalories products={mockProducts} />, container);
    });
    expect(document.querySelector('.total-calories-title').textContent).toContain('Total Calories: 600.00');
  });

  it('handles empty products array', () => {
    act(() => {
      const container = document.createElement('div');
      document.body.appendChild(container);
      ReactDOM.render(<TotalCalories products={[]} />, container);
    });
    expect(document.querySelector('.total-calories-title').textContent).toContain('Total Calories: 0.00');
  });
});