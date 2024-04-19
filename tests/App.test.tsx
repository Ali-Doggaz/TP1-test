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

  it('navigates to the users page and shows users content', async () => {
    render(<App />, { wrapper: MemoryRouter });
    const usersLink = screen.getByText('Users');
    expect(usersLink).toBeInTheDocument();
    await userEvent.click(usersLink);
    expect(screen.getByRole('heading', { name: 'User List' })).toBeInTheDocument(); // Assuming "User List" is a heading in the UserList component
  });
});


describe('UserList', () => {
  it('fetches and displays users', async () => {
    render(<UserList />);
    await waitFor(() => {
      const userItems = screen.getAllByRole('listitem');
      expect(userItems.length).toBe(10);
      expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
      expect(screen.getByText('Ervin Howell')).toBeInTheDocument();
    });
  });
});
