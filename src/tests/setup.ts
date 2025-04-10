import { beforeAll, afterAll, vi } from 'vitest';

// Mock environment variables
process.env.EDUCHAIN_TESTNET_BASE_URL = 'http://testnet.example.com';

// Mock console.error to keep test output clean
const originalConsoleError = console.error;
console.error = vi.fn();

// Clean up after all tests
afterAll(() => {
  console.error = originalConsoleError;
}); 