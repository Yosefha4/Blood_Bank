import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Diary from "../../DonorScreens/Diary";

// jest.mock("react-router-dom", () => ({
//     ...jest.requireActual("react-router-dom"),
//     useLocation: jest.fn(),
//   }));

describe("Diary Page Test", () => {
  test("Should render main title correct", () => {
    render(<Diary />);

    const mainTitle = screen.getByText("Calendar");
 
    expect(mainTitle).toBeDefined();

  });
  test("Should render 2 sub-titles correct", () => {
    render(<Diary />);

    const secTitle = screen.getByText("Set A Date");
    const threeTitle = screen.getByText("Book");
    expect(secTitle).toBeDefined();
    expect(threeTitle).toBeDefined();
  });

  test("Should render the calendar choose-day button correctly", () => {
    render(<Diary />);

    const chooseBtn = screen.getByText("Choose Day");
    expect(chooseBtn).toBeDefined();
  });
  test("Should render label correctly after click", () => {
    render(<Diary />);

    const chooseBtn = screen.getByText("Choose Day");

    fireEvent.click(chooseBtn);

    const newTitle = screen.getByText("Choose Hour");
    const newBtn = screen.getByText("Submit");

    expect(newTitle).toBeDefined();
    expect(newBtn).toBeDefined();
  });
});
