

import { Tool } from "@langchain/core/tools";
import { EduchainAgentKit } from "@/agent";

export class EduchainGetTokensListTool extends Tool {
    name = 'educhain_get_tokens_tool'

    description = `Get the list of tokens on EduChain. Use this tool when you need to get the list of tokens on the EduChain blockchain.`

    constructor(private educhainKit: EduchainAgentKit) {
        super();
    }

    protected async _call(): Promise<string> {
        try {
            console.log('educhain_get_tokens_tool tool has been called')

            const res = await this.educhainKit.getTokenList()

            return JSON.stringify({
                status: "success",
                ...res
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