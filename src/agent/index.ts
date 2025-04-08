import { get_token_info } from "../tools/queries";
import { get_token_list } from "../tools/queries/tokens";
import { get_smart_contract } from "../tools/smart-contracts/get_smart_contract";
import { create_wallet, get_nft_balance, send_edu } from "../tools/wallet";
import { NftBalanceResponse, SmartContract, TokenInfo, TransactionSummary, WalletInfo } from "../types";

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
}