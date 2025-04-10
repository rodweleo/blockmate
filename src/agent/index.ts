import { get_token_info, get_token_list } from "../tools/tokens/queries";
import {create_fungible_token, create_nft, mint_nft, mint_token} from "../tools/tokens/transactions"
import { get_smart_contract } from "../tools/smart-contracts";
import { create_wallet, get_nft_balance, getWalletBalance, send_edu } from "../tools/wallet";
import { NftBalanceResponse, SmartContract, TokenInfo, TokenOptions, TransactionSummary, WalletInfo } from "@/types";

export class EduchainAgentKit {

    readonly network: 'mainnet' | 'testnet' | 'previewnet' = 'mainnet'
    private readonly privateKey: string | undefined;
    readonly operatorAddress: string;
    private readonly isCustodial: boolean;

    constructor({
        operatorAddress,
        privateKey,
        publicKey,
        network,
    }: {
        operatorAddress: string,
        privateKey?: string,
        publicKey?: string,
        network: 'mainnet' | 'testnet' | 'previewnet'
    }) {
        if (privateKey) {
            this.privateKey = privateKey;
            this.isCustodial = true;
        } else {
            // @ts-ignore
            if (!publicKey) {
                throw new Error("Public key is missing. To perform non custodial action you should pass public key!");
            }
            this.isCustodial = false;
        }
        this.network = network;
        this.operatorAddress = operatorAddress;
    }

    async getEduchainTokenInfo(tokenAddress: string): Promise<TokenInfo> {
        return get_token_info(tokenAddress)
    }

    async getAddressNftBalance(address: string): Promise<NftBalanceResponse> {
        return get_nft_balance(address)
    }

    async getTokenList(): Promise<{
        items: TokenInfo[];
        next_page_params?: string | null;
    }> {
        return get_token_list()
    }

    async getSmartContract(address: string): Promise<SmartContract> {
        return get_smart_contract(address)
    }

    async createWallet(): Promise<WalletInfo> {
        return create_wallet()
    }

    async sendEdu(privateKey: string, toAddress: string, amount: string): Promise<TransactionSummary> {
        return send_edu(privateKey, toAddress, amount)
    }

    async getWalletBalance(walletAddress: `0x${string}`): Promise<string> {
        return getWalletBalance(walletAddress)
    }

    async createFungibleToken(options: TokenOptions){
        return create_fungible_token(options)
    }

    async createNFT(options: TokenOptions) {
        return create_nft(options)
    }

    async mintToken(
        tokenAddress: `0x${string}`,
        amount: number,
        receiver: `0x${string}`,
        custodial?: boolean,
    ) {
        const useCustodial = custodial ?? this.isCustodial;

        if (useCustodial) {
            if (!this.privateKey) {
                throw new Error("Private key is missing. To perform custodial action you should pass private key!");
            }
            return mint_token({
                tokenAddress: tokenAddress, 
                receiver: receiver,
                amount: amount
            });
        }

        return mint_token({
            tokenAddress: tokenAddress,
            receiver: receiver,
            amount: amount
        });
    }

    async mintNFT(
        recipient: `0x${string}`,
        tokenAddress: `0x${string}`,
        custodial?: boolean
    ) {
        const useCustodial = custodial ?? this.isCustodial;

        if (useCustodial) {
            if (!this.privateKey) {
                throw new Error("Private key is missing. To perform custodial action you should pass private key!");
            }
            return mint_nft({
                tokenAddress: tokenAddress,
                receiver: recipient
            });
        }

        return mint_nft({
            receiver: recipient,
            tokenAddress: tokenAddress,
        });
    }

}