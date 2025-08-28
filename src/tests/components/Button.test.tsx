import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import Button from '@/shared/components/Button';

describe('Button', () => {
  it('renders children and handles click', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click Me</Button>);
    const btn = screen.getByRole('button', { name: /click me/i });
    await user.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
