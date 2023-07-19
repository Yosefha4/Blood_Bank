import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import Profile from '../../DonorScreens/Profile';

describe("Donor Profile Test", () => {
  test("Should render the title correct", () => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );
    const profileTitle = screen.getByText("User Profile");
    expect(profileTitle).toBeDefined();
  });

  test("Should render the info-labels correct", () => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );
    const userNameTitle = screen.getByText("Username:");
    const userEmail = screen.getByText("Email:");
    const userBloodType = screen.getByText("Blood Type:");
    expect(userNameTitle).toBeDefined();
    expect(userEmail).toBeDefined();
    expect(userBloodType).toBeDefined();
  });

  test("Should render the buttons correct", () => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );
    const historyBtn = screen.getByText("History");
    const feedbackBtn = screen.getByText("Feedback");
    expect(historyBtn).toBeDefined();
    expect(feedbackBtn).toBeDefined();
  });

  test("Clicking on History button should navigate to History page",  () => {
    // const history = createMemoryHistory();
 

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );
    waitFor(() => {

    const historyBtn = screen.getByText("History");

    fireEvent.click(historyBtn);


      const newPageTitle = screen.getByText("Docs");
      expect(newPageTitle).toBeDefined();
    })
    
  });

});
