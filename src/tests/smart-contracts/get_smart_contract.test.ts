import { describe, it, expect, vi, beforeEach } from 'vitest';
import { get_smart_contract } from '../../tools/smart-contracts';

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('get_smart_contract', () => {
  const mockAddress = '0x123...';
  const mockContractData = {
    address: mockAddress,
    name: 'Test Contract',
    abi: [],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.EDUCHAIN_TESTNET_BASE_URL = 'http://testnet.example.com';
  });

  it('should successfully fetch smart contract information', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockContractData),
    });

    const result = await get_smart_contract(mockAddress);

    expect(result).toEqual(mockContractData);
    expect(mockFetch).toHaveBeenCalledWith(
      'http://testnet.example.com/api/v2/smart-contracts/0x123...'
    );
  });

  it('should throw error when address is missing', async () => {
    await expect(get_smart_contract(''))
      .rejects
      .toThrow('Missing address parameter. Please provide a valid address.');
  });

  it('should throw error when API request fails', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    await expect(get_smart_contract(mockAddress))
      .rejects
      .toThrow('HTTP error! status: 404. message: Not Found');
  });

  it('should throw error when fetch fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(get_smart_contract(mockAddress))
      .rejects
      .toThrow('Network error');
  });
}); 