

import { Tool } from "@langchain/core/tools";
import { EduchainAgentKit } from "../../../../agent";

export class EduchainCreateFungibleTokenTool extends Tool {
    name = 'educhain_create_fungible_token'

    description = `Create a fungible token on EduChain. Use this tool when you need to deploy a fungible token on the EduChain blockchain.
        ### **Inputs** (JSON string, required fields specified):
        - \`name\` (*string*, required): The name of the token (e.g., "Tether USD").
        - \`symbol\` (*string*, required): The symbol of the token (e.g., "USDT").
        - \`initialSupply\` (*number*, required): The initial supply of the token in smallest units (consider decimals).
        - \`decimals\` (*number*, optional): The number of decimal places (e.g., 18).
        - \`maxSupply\` (*number*, required): The maximum total supply the token can have.
        - \`signer\` (*string*, optional): The wallet address private key deploying the token.
        - \`type\` (*TokenType*, optional): The type of token. Should be "fungible" for this function.
    `

    constructor(private educhainKit: EduchainAgentKit) {
        super();
    }

    protected async _call(input: string): Promise<string> {
        try {
            console.log('educhain_create_fungible_token tool has been called')

            const parsedInput = JSON.parse(input);

            const result = await this.educhainKit.createFungibleToken(parsedInput)

            const tokenContractAddress = await result.getAddress()
            
            return JSON.stringify({
                status: "success",
                transactionHash: result.deploymentTransaction()?.hash,
                tokenAddress: result.getAddress(),
                contractURL: `https://edu-chain-testnet.blockscout.com/token/${tokenContractAddress}`
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