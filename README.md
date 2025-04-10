# BlockMate

![BlockMate](/public/images/BlockMate_Logo.png)
BlockMate is a collection of LangChain agents and tools for building Decentralized Educational Applications on **EduChain**. It provides a set of pre-built agents and tools that can be easily integrated into your own Decentralized Application, allowing you to quickly build and deploy educational solutions on the **EduChain blockchain**.

## Intreractive Demos
## 🎥 BlockMate Demo – Part 1
https://www.loom.com/share/4fc6808b832e4c84a35f557f5142dbb9

### 🎥 BlockMate Demo – Part 2
https://www.loom.com/share/cd00a985adce4ebcbffa4cec8bac7f7e

## High-Level Features

1. Pre-built LangChain agents for on-chain educational applications
  2. Integration with Google's Generative AI
  3. Blockchain integration capabilities via ethers.js
  4. TypeScript support for type safety
  5. Modular architecture for easy extension
  6. Comprehensive wallet management tools
  7. Smart contract interaction capabilities
  8. Token and balance querying functionality

## Current Features
1. #### **Native EduChain Token Services**
   - Create fungible tokens with minimal parameters (name, symbol, decimals, supply, etc.).
   - Mint additional tokens to existing token accounts.
2. #### **Token Operations**
   - Create Fungible Tokens (FT): Easily create and configure new fungible tokens.
   - Create Non-fungible Tokens (NFT): Easily create and configure new non-fungible tokens.
   - Transfer Tokens: Transfer tokens between accounts.
3. #### **EduChain Transactions**
   - Transfer EDU token between accounts
   
## Getting Started
### Prerequisites

1. Node.js (Latest LTS version recommended)
2. npm or yarn package manager
3. TypeScript knowledge for development
4. Access to EduChain testnet (for blockchain operations)
  
### Local Development
#### 1. Clone the repository:
```bash
git clone https://github.com/rodweleo/blockmate.git
```
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

#### 2. Install dependencies:
```bash
cd blockmate
npm install
```
#### 3. Configure environment variables in **.env** file:
```bash
GOOGLE_API_KEY = "your-google-gemini-api-key"
EDUCHAIN_TESTNET_BASE_URL = 'https://edu-chain-testnet.blockscout.com'
MAINNET_EDUCHAIN_RPC_URL = 'https://rpc.edu-chain.raas.gelato.cloud'
TESTNET_EDUCHAIN_RPC_URL = 'https://rpc.open-campus-codex.gelato.digital'

EDUCHAIN_OPERATOR_ADDRESS = 'your-edu-wallet-address'
EDUCHAIN_OPERATOR_PRIVATE_KEY = 'your-edu-wallet-private-key'

CUSTODIAL_MODE = "false"
```

#### 4. Start the agent:
```bash
npm run start
```


## Dependencies

### Main Dependeies
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
- `npm run start`: Starts up the BlockMate agent on the CLI


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## RoadMap

For details on upcoming features, check out our [ROADMAP.md](./ROADMAP.md) . If you’d like to tackle one of the tasks, look at the open issues on GitHub or create a new one if you don’t see what you’re looking for.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Rodwell Leo

## Support

For support, please:
1. Check the documentation
2. Open an issue on GitHub
3. Contact the maintainers
