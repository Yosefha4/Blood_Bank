import React from "react";
import GetDataPDFile from "../../Screens/GetDataPDFile";
import { render, screen, waitFor } from "@testing-library/react";
import { PDFDownloadLink } from "@react-pdf/renderer"; // Import the PDFDownloadLink component

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

// // Mock the localStorage
// const mockLocalStorage = (() => {
//   let store = {};

//   return {
//     getItem: jest.fn((key) => store[key] || null),
//     setItem: jest.fn((key, value) => {
//       store[key] = value.toString();
//     }),
//     removeItem: jest.fn((key) => {
//       delete store[key];
//     }),
//     clear: jest.fn(() => {
//       store = {};
//     }),
//   };
// })();

// Object.defineProperty(window, "localStorage", {
//   value: mockLocalStorage,
//   writable: true,
// });

// Mock the PDFDownloadLink component
// jest.mock("@react-pdf/renderer", () => ({
//   PDFDownloadLink: ({ document, fileName }) => (
//     <a href="#" download={`${fileName}.pdf`}>
//       Download PDF
//     </a>
//   ),
// }));


// jest.mock("../../components/PDFfile", () => {
//   return () => <div>Mocked PDFfile component</div>;
// });



describe("Should render GetPdfData correctlly", () => {
  test("Render 'Permmission Warning'  on Student/Employee UserType", () => {
    // const userTypeAdmin = "Admin";
    window.localStorage.setItem("userType", "Employee");

    render(<GetDataPDFile />);

    const adminPermissionMessage = screen.getByText(
      /Requires Admin Permission/i
    );
    expect(adminPermissionMessage).toBeDefined();
  });

});
// describe("Should render GetPdfData on Admin correctlly", () => {

 
//   test("Render 'the titles correct", () => {

//     const mockLocalStorage = {
//       getItem: jest.fn(() =>  'Admin'),
//       setItem: jest.fn(),
//       removeItem: jest.fn(),
//     };
//     Object.defineProperty(window, "localStorage", {
//       value: mockLocalStorage,
//       writable: true,
//     });

 

//     mockLocalStorage.setItem("userType", "Admin");
//     console.log("first", mockLocalStorage.getItem("userType"));

//     render(<GetDataPDFile />);

//     const adminPermissionMessage = screen.getByText(
//       /PDF EXPORT/i
//     );
//     expect(adminPermissionMessage).toBeDefined();

//   });

// });
