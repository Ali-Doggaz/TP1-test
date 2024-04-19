import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegistrationForm from '../src/components/RegistrationForm';
import { describe, expect, it, vi } from 'vitest';

vi.mock('node-fetch', () => ({
  default: vi.fn(() => Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: 'User registered successfully!' })
  }))
}));

describe('RegistrationForm', () => {
  it('allows input to be entered', () => {
    render(<RegistrationForm />);
    const usernameInput = screen.getByLabelText('Username:');
    const emailInput = screen.getByLabelText('Email:');
    
    fireEvent.change(usernameInput, { target: { value: 'john_doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

    expect(usernameInput.value).toBe('john_doe');
    expect(emailInput.value).toBe('john@example.com');
  });

  it('submits form and displays success message', async () => {
    render(<RegistrationForm />);
    const button = screen.getByRole('button', { name: 'Register' });

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('User registered successfully!')).toBeInTheDocument();
    });
  });
});
