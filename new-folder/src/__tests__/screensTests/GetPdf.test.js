import React from "react";
import GetDataPDFile from "../../Screens/GetDataPDFile";
import { render, screen } from "@testing-library/react";
// import "jest-localstorage-mock";


// Mock the react-pdf library
jest.mock("@react-pdf/renderer", () => ({
    StyleSheet: {
      create: (styles) => styles,
    },
    Document: "div",
    Page: "div",
    Text: "span",
  }));
  


describe("Should render GetPdfData correctlly", () => {
    test("Render 'Permmission Warning'  on Student/Employee UserType", () => {

        // const userTypeAdmin = "Admin";
        window.localStorage.setItem("userType", 'Employee');


        render(<GetDataPDFile />);

        // const downloadButton = screen.getByText('Requires Admin Permission !');
        // const downloadButton = screen.getByText(/Download PDF/i);
        const adminPermissionMessage = screen.getByText(
          /Requires Admin Permission/i
        );
        // expect(downloadButton).toBeInTheDocument();
        expect(adminPermissionMessage).toBeDefined();

    })
    // test("Render the 'Download' button on Admin UserType", () => {

  

    // })
})