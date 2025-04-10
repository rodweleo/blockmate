import { describe, it, expect, vi, beforeEach } from 'vitest';
import { send_edu } from '../../../tools/wallet/transactions/send_edu';
import { ethers } from 'ethers';

// Mock ethers
vi.mock('ethers', () => ({
  ethers: {
    Wallet: vi.fn(),
    parseEther: vi.fn(),
  },
}));

// Mock provider
vi.mock('../../../utils/educhain_providers', () => ({
  eduTestnetProvider: {},
}));

describe('send_edu', () => {
  const mockPrivateKey = '0x123...';
  const mockToAddress = '0x456...';
  const mockAmount = '1.5';
  const mockWalletAddress = '0x789...';
  const mockTxHash = '0xabc...';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should successfully send EDU tokens', async () => {
    // Mock wallet instance
    const mockWallet = {
      address: mockWalletAddress,
      sendTransaction: vi.fn().mockResolvedValue({
        hash: mockTxHash,
        wait: vi.fn().mockResolvedValue({}),
      }),
    };

    // Mock ethers.Wallet constructor
    (ethers.Wallet as any).mockImplementation(() => mockWallet);
    (ethers.parseEther as any).mockReturnValue('1500000000000000000'); // 1.5 EDU in wei

    const result = await send_edu(mockPrivateKey, mockToAddress, mockAmount);

    expect(result).toEqual({
      hash: mockTxHash,
      from: mockWalletAddress,
      to: mockToAddress,
      amount: mockAmount,
    });

    expect(ethers.Wallet).toHaveBeenCalledWith(mockPrivateKey, expect.any(Object));
    expect(mockWallet.sendTransaction).toHaveBeenCalledWith({
      to: mockToAddress,
      value: '1500000000000000000',
    });
  });

  it('should throw error when transaction fails', async () => {
    const mockWallet = {
      address: mockWalletAddress,
      sendTransaction: vi.fn().mockRejectedValue(new Error('Transaction failed')),
    };

    (ethers.Wallet as any).mockImplementation(() => mockWallet);

    await expect(send_edu(mockPrivateKey, mockToAddress, mockAmount))
      .rejects
      .toThrow('Transaction failed');
  });

  it('should throw error when transaction receipt is null', async () => {
    const mockWallet = {
      address: mockWalletAddress,
      sendTransaction: vi.fn().mockResolvedValue({
        hash: mockTxHash,
        wait: vi.fn().mockResolvedValue(null),
      }),
    };

    (ethers.Wallet as any).mockImplementation(() => mockWallet);

    await expect(send_edu(mockPrivateKey, mockToAddress, mockAmount))
      .rejects
      .toThrow('Transaction failed');
  });
}); 