import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import App from "../src/App";
import UserList from '../src/components/UserList';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

describe('App Routing', () => {
  it('renders headline on home page', () => {
    render(<App />, { wrapper: MemoryRouter });
    const headline = screen.getByText("This is your home!");
    expect(headline).toBeInTheDocument();
  });

  it('navigates to the about page and shows about content', async () => {
    render(<App />, { wrapper: MemoryRouter });
    const aboutLink = screen.getByText('About');
    expect(aboutLink).toBeInTheDocument();
    await userEvent.click(aboutLink);
    expect(screen.getByText("About Page")).toBeInTheDocument(); // Assuming "About Page" is rendered text on the About component
  });
});