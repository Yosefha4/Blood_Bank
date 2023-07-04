import React from "react";
import About from "../../components/About";
import { render, screen } from "@testing-library/react";

// Mock window.matchMedia
global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

describe("Should render About component correctlly", () => {
  test("Render the title correctly", () => {
    render(<About />);

    // Check if the table with the details is rendered correctly
    const title = screen.getByText("Information");
    expect(title).toBeDefined();

  });
});
