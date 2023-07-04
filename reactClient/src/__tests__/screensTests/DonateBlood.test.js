import React from "react";
import DonateBlood from "../../Screens/DonateBlood"
import { render, screen, fireEvent } from "@testing-library/react";

// Mock window.matchMedia
global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

describe("Should render the component correctlly (Input Fields & Button) ", () => {
  test("Donate Blood component", () => {
    // const addDonateBlood = jest.fn().mockReturnValue(true);

    render(<DonateBlood />);
    const nameInput = screen.getByLabelText("Full Name");
    const addressInput = screen.getByLabelText("Address");
    const birthInput = screen.getByLabelText("Birth Day");
    const IdInput = screen.getByLabelText("ID");
    const bTypeInput = screen.getByLabelText("Blood Type");

    const subButton = screen.getByText("Submit");
    expect(subButton).toBeDefined();

    expect(nameInput).toBeDefined();
    expect(addressInput).toBeDefined();
    expect(birthInput).toBeDefined();
    expect(IdInput).toBeDefined();
    expect(bTypeInput).toBeDefined();

    // // Mock input values
    // fireEvent.change(nameInput, { target: { value: "John Doe" } });
    // fireEvent.change(addressInput, { target: { value: "123 Main St" } });
    // fireEvent.change(birthInput, { target: { value: "1990-01-01" } });
    // fireEvent.change(IdInput, { target: { value: "1234567890" } });
    // fireEvent.change(bTypeInput, { target: { value: "AB+" } });

  
  });
});
