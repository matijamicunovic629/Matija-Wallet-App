import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputAmountStep from './InputAmountStep';
import useSendTokenModalStore from '../../store/useSendTokenModalStore';
import useTokenBalance from '../../hooks/useTokenBalance';
import { vi } from 'vitest';

// Mocking hooks
vi.mock('../../store/useSendTokenModalStore');
vi.mock('../../hooks/useTokenBalance');

const setupMocks = () => {
  useSendTokenModalStore.mockReturnValue({
    nextStep: vi.fn(),
    tokenInfo: { tokenAddress: '0x123', logoUrl: '', symbol: 'ETH' },
    sendAmount: 0,
    sendAddress: '',
    setSendAmount: vi.fn(),
    setSendAddress: vi.fn(),
  });

  useTokenBalance.mockReturnValue({
    isLoading: false,
    balance: 100,
  });
};

// Helper function to wrap rendering with mocks.
const renderComponent = () => {
  setupMocks();
  return render(<InputAmountStep />);
};

describe('<InputAmountStep />', () => {
  test('renders without crashing', () => {
    renderComponent();
    expect(screen.getByPlaceholderText(/Token Amount/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/To Address/i)).toBeInTheDocument();
  });

  test('displays available token information', () => {
    renderComponent();
    expect(screen.getByText(/Available/i)).toBeInTheDocument();
    expect(screen.getByText(/ETH/i)).toBeInTheDocument();
    expect(screen.getByText(/100/i)).toBeInTheDocument(); // assuming balance provided by mocked hook
  });

  test('shows alert for insufficient balance', () => {
    renderComponent();
    fireEvent.change(screen.getByPlaceholderText(/Token Amount/i), {
      target: { value: '200' },
    });
    expect(screen.getByText(/Insufficient Balance/i)).toBeInTheDocument();
  });

  test('shows alert for invalid wallet address', () => {
    renderComponent();
    const addressInput = screen.getByPlaceholderText(/To Address/i);
    fireEvent.change(addressInput, { target: { value: 'invalid_address' } });
    expect(screen.getByText(/Invalid Wallet Address/i)).toBeInTheDocument();
  });

  test('enables "Next" button only when conditions are met', () => {
    renderComponent();
    const nextButton = screen.getByRole('button', { name: /Next/i });
    expect(nextButton).toBeDisabled();

    fireEvent.change(screen.getByPlaceholderText(/Token Amount/i), {
      target: { value: '10' },
    });
    fireEvent.change(screen.getByPlaceholderText(/To Address/i), {
      target: { value: '0x87590744785D6CffCE10688331BA669ac5f69b39' },
    }); // Replace with a valid address for testing purposes

    expect(nextButton).not.toBeDisabled();
  });
});
