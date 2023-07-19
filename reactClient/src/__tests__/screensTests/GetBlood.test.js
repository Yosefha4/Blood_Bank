import React from "react";
import GetBlood from "../../Screens/GetBlood";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

// Mock window.matchMedia
global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

describe("Should render GetBlood correctlly  ", () => {
  test("Render the GetBlood Title and Button correctlly", () => {
    render(<GetBlood />);
    const title = screen.getAllByText("Get Blood");
    expect(title.length === 2 ).toBeTruthy()
  });
  test("Render the Input Labels ", () => {
    waitFor(() => {
      render(<GetBlood />);
    });
    const firstInput = screen.getByText("Amount");
    const secondInput = screen.getByText("B.Type");
    expect(firstInput).toBeDefined();
    expect(secondInput).toBeDefined();
  });
  test("Render the Emergancy Button ", () => {
    waitFor(() => {
      render(<GetBlood />);
    });
    const EmergancyButton = screen.getByText("This_Is_Emergancy?");
    expect(EmergancyButton).toBeDefined();
  });
  test("Render another input & button on Emergancy  ", () => {
    waitFor(() => {
      render(<GetBlood />);
    });
    const EmergancyButton = screen.getByText("This_Is_Emergancy?");
    fireEvent.click(EmergancyButton);
    const EmergInput = screen.getByPlaceholderText("How much you need ?");
    const EmergSubButton = screen.getByText("Get Blood For Emergency");
    expect(EmergInput).toBeDefined();
    expect(EmergSubButton).toBeDefined();
  });
});
