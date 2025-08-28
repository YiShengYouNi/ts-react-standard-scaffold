import type { Meta, StoryObj } from '@storybook/react';
import Home from './Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';

const queryClient = new QueryClient();

const meta: Meta<typeof Home> = {
  title: 'Pages/Home',
  component: Home,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <div className="p-6 bg-gray-50 min-h-[50vh]">
            <Story />
          </div>
        </MemoryRouter>
      </QueryClientProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Home>;
export const Default: Story = {};
