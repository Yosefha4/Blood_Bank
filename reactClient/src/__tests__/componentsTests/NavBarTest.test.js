import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../../components/Navbar";
import { MemoryRouter } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

// Mock window.matchMedia
global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

// Mock useNavigate
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Navbar", () => {
  test("renders the BloodBank Logo correctly", () => {
    // Mock the navigate function
    const mockNavigate = jest.fn();
    const mockUserContextValue = { userType: "mockUserType" };

    require("react-router-dom").useNavigate.mockImplementation(
      () => mockNavigate
    );
    render( 
      <UserContext.Provider value={mockUserContextValue}>
        <Navbar />
      </UserContext.Provider>
  );

    // Check if the logo is rendered
    const logoElement = screen.getByText("Blood Bank");
    expect(logoElement).toBeDefined();
  });
  test("Check if the navigation links are rendered", () => {

    const mockUserContextValue = { userType: "mockUserType" };

    render(     <UserContext.Provider value={mockUserContextValue}>
      <Navbar />
    </UserContext.Provider>);

    // Check if the navigation links are rendered
    const homeLink = screen.getByText("Home");
    const donateLink = screen.getByText("Donate");
    const getLink = screen.getByText("Get");
    const moreLink = screen.getByText("More");
    const exportLink = screen.getByText("Export");
    expect(homeLink).toBeDefined();
    expect(donateLink).toBeDefined();
    expect(getLink).toBeDefined();
    expect(moreLink).toBeDefined();
    expect(exportLink).toBeDefined();

    // Check if the login/register link is rendered when not logged in
    const loginLink = screen.getByText("Login/Register");
    expect(loginLink).toBeDefined();
  });


//   test("Navigates to Home page when Home link is clicked", () => {
//     const { container, getByText } = render(
//         <MemoryRouterProvider>
//         <Navbar />
//       </MemoryRouterProvider>
//     );

//     const homeLink = getByText("Home");
//     fireEvent.click(homeLink);

//     // Assert that the current URL has changed to the home page URL
//     expect(container.innerHTML).toMatch("This is the Home page");
//   });
});
