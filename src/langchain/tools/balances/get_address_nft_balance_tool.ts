
import { Tool } from "@langchain/core/tools";
import { EduchainAgentKit } from "../../../agent";

export class EduchainGetAddressNftBalanceTool extends Tool {
    name = 'educhain_get_address_nft_balance_tool'

    description = `Get information of a token on EduChain. Use this tool when you need to get information about a specific token on the EduChain blockchain.
        ### **Inputs** (JSON string, required fields specified):
        - **address** (*string*, required): The wallet address (e.g., "0x7bA0F2cb1608207031839F4273e4dBC8d88F33Cw").

    `

    constructor(private educhainKit: EduchainAgentKit) {
        super();
    }

    protected async _call(input: string): Promise<string> {
        try {
            console.log('educhain_get_address_nft_balance_tool tool has been called')

            const parsedInput = JSON.parse(input);
            if (!parsedInput.address) {
                throw new Error("Address is required");
            }

            const res = await this.educhainKit.getAddressNftBalance(
                parsedInput.address,
            )

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