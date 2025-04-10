


import { Tool } from "@langchain/core/tools";
import { EduchainAgentKit } from "../../../../agent";

export class EduchainGetWalletBalanceTool extends Tool {
    name = 'educhain_get_wallet_address'

    description = `Get a wallet's balance on EduChain. Use this tool when you need to get a wallet's balance on the EduChain blockchain.
        ### **Inputs** (JSON string, required fields specified):
                - **walletAddress** (*string*, required): The evm address of the token to check the details (e.g., "0x7bA0F2cb1608207031839F4273e4dBC8d88F33Cw").

    `

    constructor(private educhainKit: EduchainAgentKit) {
        super();
    }

    protected async _call(input: string): Promise<string> {
        try {
            console.log('educhain_get_wallet_balance tool has been called')

            if (!input) {
                throw new Error("Wallet address is required!")
            }

            const parsedInput = JSON.parse(input)
            const walletAddress = parsedInput.walletAddress;

            const balance = await this.educhainKit.getWalletBalance(walletAddress)

            return JSON.stringify({
                status: "success",
                balance: balance
            });
        } catch (error: any) {
            return JSON.stringify({
                status: "error",
                message: error.message,
                code: error.code || "UNKNOWN_ERROR",
            });
        }
    }
}