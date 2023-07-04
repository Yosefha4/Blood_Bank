import React from "react";
import StockInfo from "../../Screens/StockInfo"
import { render, screen } from "@testing-library/react";


// Mock window.matchMedia
global.matchMedia = global.matchMedia || function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

describe("Should render the StockInfo component correctlly",()=>{
    test("Render the title",()=>{
        render(<StockInfo />)

        const title = screen.getByText("In Stock");
        expect(title).toBeDefined();
    })

    test("Render the bloodTypes cards",()=>{
        render(<StockInfo />)

        const oPlusCard = screen.getByText("O+");
        const oMinusCard = screen.getByText("O-");
        const aMinusCard = screen.getByText("A-");
        const aPlusCard = screen.getByText("A+");
        const bMinusCard = screen.getByText("B-");
        const bPlusCard = screen.getByText("B+");
        const abMinusCard = screen.getByText("AB-");
        const abPlusCard = screen.getByText("AB+");
        expect(oPlusCard).toBeDefined();
        expect(oMinusCard).toBeDefined();
        expect(aMinusCard).toBeDefined();
        expect(aPlusCard).toBeDefined();
        expect(bMinusCard).toBeDefined();
        expect(bPlusCard).toBeDefined();
        expect(abMinusCard).toBeDefined();
        expect(abPlusCard).toBeDefined();
    })
})