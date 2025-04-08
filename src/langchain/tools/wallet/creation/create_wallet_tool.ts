

import { Tool } from "@langchain/core/tools";
import { EduchainAgentKit } from "../../../../agent";

export class EduchainCreateWalletTool extends Tool {
    name = 'educhain_create_wallet'

    description = ` Create a new wallet on EduChain. Use this tool when you need to create a new wallet on the EduChain blockchain.`

    constructor(private educhainKit: EduchainAgentKit) {
        super();
    }

    protected async _call(): Promise<string> {
        try {
            console.log('educhain_create_wallet tool has been called')


            const details = await this.educhainKit.createWallet()

            return JSON.stringify({
                status: "success",
                ...details
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