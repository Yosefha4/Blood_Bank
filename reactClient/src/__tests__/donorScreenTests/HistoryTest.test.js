import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import History from "../../DonorScreens/History";

// Mock the chart-related dependencies
jest.mock("chart.js/auto", () => ({
  __esModule: true,
  default: {
    register: jest.fn(),
  },
}));

jest.mock("../../components/BarChart", () => {
  return function MockBarChart() {
    return <div>Mock Bar Chart</div>;
  };
});

describe("History Page Test", () => {
  test("Should render the main title correctly", () => {
    render(
      <MemoryRouter>
        <History />
      </MemoryRouter>
    );

    const profileTitle = screen.getByText("History");

    expect(profileTitle).toBeDefined();
 
  });
  test("Should render the sub-titles correctly", () => {
    render(
      <MemoryRouter>
        <History />
      </MemoryRouter>
    );

    const docsTitle = screen.getByText("Docs");
    const graphsTitle = screen.getByText("Graphs");
    expect(docsTitle).toBeDefined();
    expect(graphsTitle).toBeDefined();
  });
});
