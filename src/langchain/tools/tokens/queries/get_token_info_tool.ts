
import { Tool } from "@langchain/core/tools";
import { EduchainAgentKit } from "../../../../agent";

export class EduchainGetTokenInfoTool extends Tool {
    name = 'educhain_get_token_info'

    description = `Get information of a token on EduChain. Use this tool when you need to get information about a specific token on the EduChain blockchain.
        ### **Inputs** (JSON string, required fields specified):
        - **tokenAddress** (*string*, required): The evm address of the token to check the details (e.g., "0x7bA0F2cb1608207031839F4273e4dBC8d88F33Cw").

        ### **Example Usage:**
        1. **Get details of token 0x7bA0F2cb1608207031839F4273e4dBC8d88F33Cw**
        '{
            "address": "0x7bA0F2cb1608207031839F427Ce4dBC8d88F33C7",
            "holders": "1560",
            "name": "Tether USD",
            "symbol": "USDT",
            "total_supply": "3000000000000",
            "type": "ERC-20",
            "volume_24h": null
        }'
    `

    constructor(private educhainKit: EduchainAgentKit) {
        super();
    }

    protected async _call(input: string): Promise<string> {
        try {
            console.log('educhain_get_token_info tool has been called')

            const parsedInput = JSON.parse(input);
            if (!parsedInput.tokenAddress) {
                throw new Error("Token address is required");
            }

            const details = await this.educhainKit.getEduchainTokenInfo(
                parsedInput.tokenAddress,
            )

            return JSON.stringify({
                status: "success",
                address: details.address,
                holders: details.holders,
                name: details.name,
                symbol: details.symbol,
                decimals: details.decimals,
                total_supply: details.total_supply,
                type: details.type
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