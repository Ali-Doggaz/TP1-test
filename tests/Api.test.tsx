import { render, screen, waitFor } from '@testing-library/react';
import UserList from '../src/components/UserList';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';

// Mock fetch globally
global.fetch = vi.fn();

beforeEach(() => {
  // Reset fetch mock before each test
  fetch.mockReset();
});

afterEach(() => {
  // Ensure the mock is clear after each test
  fetch.mockClear();
});

describe('UserList', () => {
    it('fetches and displays users', async () => {
        fetch.mockResolvedValue({
          ok: true,
          json: () => Promise.resolve([
            { id: 1, name: 'Leanne Graham' },
            { id: 2, name: 'Ervin Howell' }
          ])
        });
      
        render(<UserList />);
        const userItems = await screen.findAllByRole('listitem');
        expect(userItems.length).toBe(2);
        expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
        expect(screen.getByText('Ervin Howell')).toBeInTheDocument();
      });
      

  it('displays an error message when fetch fails', async () => {
    fetch.mockRejectedValue(new Error('Failed to fetch'));

    render(<UserList />);
    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
    });
  });
});
