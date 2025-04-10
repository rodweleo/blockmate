
export type TokenType = 'FUNGIBLE' | 'NON-FUNGIBLE';

export type TokenInfo = {
    address: string;
    circulating_market_cap: number | null;
    decimals: string; // or number if you want to cast
    exchange_rate: number | null;
    holders: string; // or number if you plan to cast it
    icon_url: string | null;
    name: string;
    symbol: string;
    total_supply: string; // or number if parsing
    type: string; // could also be union type: 'ERC-20' | 'BEP-20' | etc.
    volume_24h: number | null;
};

export type NftBalanceResponse = {
    items: [];
    next_page_params?: string | null
}

export type SmartContract = {
    verified_twin_address_hash: string;
    is_verified: boolean;
    is_changed_bytecode: boolean;
    is_partially_verified: boolean;
    is_fully_verified: boolean;
    is_verified_via_sourcify: boolean;
    is_verified_via_eth_bytecode_db: boolean;
    is_self_destructed: boolean;
    can_be_visualized_via_sol2uml: boolean;
    minimal_proxy_address_hash: string;
    sourcify_repo_url: string;
    name: string;
    optimization_enabled: boolean;
    optimizations_runs: number;
    compiler_version: string;
    evm_version: string;
    verified_at: string; // ISO date string
    abi: string;
    source_code: string;
    file_path: string;
    compiler_settings: {
        compilationTarget: Record<string, string>;
        evmVersion: string;
        libraries: Record<string, string>;
        metadata: {
            bytecodeHash: string;
        };
        optimizer: {
            enabled: boolean;
            runs: number;
        };
        remappings: string[];
    };
    constructor_args: string;
    additional_sources: Array<{
        file_path: string;
        source_code: string;
    }>;
    decoded_constructor_args: Array<[string, {
        internalType: string;
        name: string;
        type: string;
    }]>;
    deployed_bytecode: string;
    creation_bytecode: string;
    external_libraries: Array<{
        name: string;
        address_hash: string;
    }>;
    language: 'solidity' | 'vyper' | 'yul' | string;
};


export type WalletInfo = {
    address: string;
    mnemonic: string | undefined;
    privateKey: string;
    publicKey: string;
}

export type TransactionSummary = {
    hash: string;
    from: string;
    to: string;
    amount: string | number;
};

export type TokenOptions = {
    name: string;
    symbol: string;
    initialSupply?: number;
    maxSupply?: number;
    decimals?: number;
    signer?: string;
    type?: TokenType;
    baseURI? : string;
}