import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PreviewStep from './PreviewStep';
import useSendTokenModalStore from '../../store/useSendTokenModalStore';
import { useAccount } from 'wagmi';
import useGasEstimation from '../../hooks/useGasEstimation';
import { useEthersSigner } from '../../hooks/useEthersProvider';
import { useSendTransactionMutation } from '../../hooks/useSendTransactionMutation';
import { vi, Mock } from 'vitest';

// Mocking the modules
vi.mock('../../store/useSendTokenModalStore', () => ({
  __esModule: true,
  default: vi.fn(),
}));
vi.mock('wagmi', () => ({ __esModule: true, useAccount: vi.fn() }));
vi.mock('../../hooks/useGasEstimation', () => ({
  __esModule: true,
  default: vi.fn(),
}));
vi.mock('../../hooks/useEthersProvider', () => ({
  __esModule: true,
  useEthersSigner: vi.fn(),
}));
vi.mock('../../hooks/useSendTransactionMutation', () => ({
  __esModule: true,
  useSendTransactionMutation: vi.fn(),
}));

describe('PreviewStep Component', () => {
  const mockUseSendTokenModalStore = useSendTokenModalStore as unknown as Mock;
  const mockUseAccount = useAccount as unknown as Mock;
  const mockUseGasEstimation = useGasEstimation as unknown as Mock;
  const mockUseEthersSigner = useEthersSigner as unknown as Mock;
  const mockUseSendTransactionMutation =
    useSendTransactionMutation as unknown as Mock;

  beforeEach(() => {
    mockUseSendTokenModalStore.mockReturnValue({
      prevStep: vi.fn(),
      nextStep: vi.fn(),
      setTransactionHash: vi.fn(),
      sendAddress: '0x87590744785D6CffCE10688331BA669ac5f69b39',
      tokenInfo: {
        tokenAddress: '0x703606c6e30b84570a4b85c5cac30632d763e12c',
        symbol: 'MTJ',
      },
      sendAmount: 100,
    });

    mockUseAccount.mockReturnValue({
      address: '0x6Ca9e422Ec06bdD730F81e703a16cfEC4a051a5f',
    });
    mockUseGasEstimation.mockReturnValue({
      isLoading: false,
      data: {
        gasEstimate: '0.01',
        hasSufficientNativeBalance: true,
        gasLimit: '21000',
        gasPrice: '50',
      },
    });
    mockUseEthersSigner.mockReturnValue(vi.fn());
    mockUseSendTransactionMutation.mockReturnValue({
      mutate: vi.fn(),
    });
  });

  it('renders the component without crashing', () => {
    render(<PreviewStep />);
    expect(screen.getByText(/100 MTJ/)).toBeInTheDocument();
    expect(screen.getByText(/Sepolia Testnet/)).toBeInTheDocument();
    expect(screen.getByText(/Confirm/)).toBeInTheDocument();
    expect(screen.getByText(/Prev/)).toBeInTheDocument();
  });

  it('calls prevStep when Prev button is clicked', () => {
    render(<PreviewStep />);
    fireEvent.click(screen.getByText('Prev'));
    expect(useSendTokenModalStore().prevStep).toHaveBeenCalled();
  });

  it('displays error alert if insufficient balance', async () => {
    mockUseGasEstimation.mockReturnValue({
      isLoading: false,
      data: {
        gasEstimate: '0.01',
        hasSufficientNativeBalance: false,
        gasLimit: '21000',
        gasPrice: '50',
      },
    });

    render(<PreviewStep />);
    expect(
      await screen.findByText(
        /You don't have enough native balance to pay gas fee/,
      ),
    ).toBeInTheDocument();
  });

  it('calls sendTransactionMutate when Confirm button is clicked', async () => {
    const sendTransactionMutate = vi.fn();
    mockUseSendTransactionMutation.mockReturnValue({
      mutate: sendTransactionMutate,
    });

    render(<PreviewStep />);
    fireEvent.click(screen.getByText('Confirm'));

    await waitFor(() => {
      expect(sendTransactionMutate).toHaveBeenCalled();
    });
  });
});
