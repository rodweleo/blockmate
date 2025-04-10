# BlockMate

BlockMate is a collection of LangChain agents and tools for building educational applications on EduChain. It provides a set of pre-built agents and tools that can be easily integrated into your own Decentralized Application, allowing you to quickly build and deploy educational solutions on-chain.

## Features

1. Pre-built LangChain agents for educational applications
  2. Integration with Google's Generative AI
  3. Blockchain integration capabilities via ethers.js
  4. TypeScript support for type safety
  5. Modular architecture for easy extension
  6. Comprehensive wallet management tools
  7. Smart contract interaction capabilities
  8. Token and balance querying functionality

## Installation

```bash
npm install educhain-agent-kit
```

## Prerequisites

1. Node.js (Latest LTS version recommended)
2. npm or yarn package manager
3. TypeScript knowledge for development
4. Access to EduChain testnet (for blockchain operations)

## Project Structure

```
src/
├── agent/     # LangChain agent implementations
├── langchain/ # LangChain specific configurations
├── tools/     # Custom tools and utilities
│   ├── wallet/           # Wallet management tools
│   │   ├── create/      # Wallet creation utilities
│   │   ├── queries/     # Wallet query tools
│   │   └── transactions/# Transaction handling tools
│   ├── smart-contracts/ # Smart contract interaction tools
│   └── queries/         # General query tools
│       ├── tokens/      # Token-related queries
│       └── balances/    # Balance checking tools
├── types/     # TypeScript type definitions
└── utils/     # Helper functions and utilities
```

## Tools Documentation

### Wallet Tools

#### Transaction Tools
- `send_edu`: Send EDU tokens to a specified address
  ```typescript
  const result = await send_edu(privateKey, toAddress, amount);
  ```
  - Parameters:
    - `privateKey`: Sender's private key
    - `toAddress`: Recipient's address
    - `amount`: Amount of EDU to send
  - Returns: Transaction summary including hash, from, to, and amount

#### Wallet Creation
- Tools for creating and managing wallets on the EduChain network

#### Wallet Queries
- Tools for querying wallet information and status

### Smart Contract Tools

#### Contract Interaction
- `get_smart_contract`: Fetch smart contract information
  ```typescript
  const contract = await get_smart_contract(address);
  ```
  - Parameters:
    - `address`: Smart contract address
  - Returns: Smart contract details and metadata

### Query Tools

#### Token Queries
- Tools for querying token information and metadata

#### Balance Queries
- Tools for checking token balances and account information

## Dependencies

### Main Dependencies
- @langchain/core: ^0.3.43 - Core LangChain functionality
- @langchain/google-genai: ^0.2.2 - Google's Generative AI integration
- @langchain/langgraph: ^0.2.63 - LangGraph for agent workflows
- dotenv: ^16.4.7 - Environment variable management
- ethers: ^6.13.5 - Ethereum interaction library

### Development Dependencies
- @types/node: ^22.14.0 - Node.js type definitions
- ts-node: ^10.9.2 - TypeScript execution environment
- typescript: ^5.8.3 - TypeScript compiler
- vitest: ^3.1.1 - Testing framework

## Scripts

- `npm run build`: Compiles TypeScript code to JavaScript
- `npm run test-vitest`: Runs tests using Vitest
- `npm run prepare`: Runs build before package installation
- `npm run prepublishOnly`: Runs build before publishing

## Environment Setup

Create a `.env` file with the following variables:
```
EDUCHAIN_TESTNET_BASE_URL=your_testnet_url
```

## Usage Examples

### Sending EDU Tokens
```typescript
import { send_edu } from 'educhain-agent-kit';

const transaction = await send_edu(
  'your_private_key',
  'recipient_address',
  '1.5' // amount in EDU
);
```

### Fetching Smart Contract Information
```typescript
import { get_smart_contract } from 'educhain-agent-kit';

const contract = await get_smart_contract('contract_address');
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Rodwell Leo

## Support

For support, please:
1. Check the documentation
2. Open an issue on GitHub
3. Contact the maintainers
