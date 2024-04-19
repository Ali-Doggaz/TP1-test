import { render, screen, waitFor } from '@testing-library/react';
import UserList from '../src/components/UserList'; // Adjust the path as necessary
import { describe, expect, it, vi } from 'vitest';

// Mock the fetch function to simulate an error
vi.mock('node-fetch', () => ({
  default: vi.fn(() => Promise.reject(new Error('API call failed')))
}));

describe('UserList', () => {
  it('displays an error message when the fetch fails', async () => {
    render(<UserList />);
    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
    });
  });

  it('fetches and displays users', async () => {
    // Mock fetch for successful scenario
    global.fetch = vi.fn(() => Promise.resolve({
      json: () => Promise.resolve([
        { id: 1, name: 'Leanne Graham' },
        { id: 2, name: 'Ervin Howell' }
      ])
    }));

    render(<UserList />);
    await waitFor(() => {
      const userItems = screen.getAllByRole('listitem');
      expect(userItems.length).toBe(2);
      expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
      expect(screen.getByText('Ervin Howell')).toBeInTheDocument();
    });
  });
});
