import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../../Screens/HomePage';
import { Card } from 'antd';


// Mock window.matchMedia
global.matchMedia = global.matchMedia || function () {
  return {
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};
  
  jest.mock('antd', () => {
    const originalAntd = jest.requireActual('antd');
    const mockedAntd = {
      ...originalAntd,
      Card: jest.fn().mockImplementation(({ children, hoverable }) => (
        <div className={`mocked-card ${hoverable ? 'hoverable' : ''}`}>{children}</div>
      )),
      // You can add mock implementations for other Ant Design components used in HomePage
    };
    return mockedAntd;
  });

describe('HomePage Component', () => {
  test('renders Blood Types & Information titles', () => {
    render(<HomePage />);
    const firstTitle = screen.getByText('Blood Types');
    const secondTitle = screen.getByText('Information');
    expect(firstTitle).toBeDefined();
    expect(secondTitle).toBeDefined();
  });

})




