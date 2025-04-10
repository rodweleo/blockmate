import { get_token_info, get_token_list } from "../tools/tokens/queries";
import {create_fungible_token, create_nft} from "../tools/tokens/transactions"
import { get_smart_contract } from "../tools/smart-contracts";
import { create_wallet, get_nft_balance, getWalletBalance, send_edu } from "../tools/wallet";
import { NftBalanceResponse, SmartContract, TokenInfo, TokenOptions, TransactionSummary, WalletInfo } from "@/types";

export class EduchainAgentKit {

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
}