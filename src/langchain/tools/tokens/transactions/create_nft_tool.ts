

import { Tool } from "@langchain/core/tools";
import { EduchainAgentKit } from "../../../../agent";

export class EduchainCreateNFTTool extends Tool {
    name = 'educhain_create_non_fungible_token'

    description = `Create a Non-Fungible token on EduChain. Use this tool when you need to deploy a non-fungible token on the EduChain blockchain.
        ### **Inputs** (JSON string, required fields specified):
        - name (*string*, required): The name of the token (e.g., "Tether USD").
        - symbol (*string*, required): The symbol of the token (e.g., "USDT").
        - baseURI (*string*, required): The https home for all the NFT data (like name, image, and description).
    `

    constructor(private educhainKit: EduchainAgentKit) {
        super();
    }

    protected async _call(input: string): Promise<string> {
        try {
            console.log('educhain_create_non_fungible tool has been called')

            const parsedInput = JSON.parse(input);

            const result = await this.educhainKit.createNFT(parsedInput)

            const tokenContractAddress = await result.getAddress()
            
            return JSON.stringify({
                status: "success",
                transactionHash: result.deploymentTransaction()?.hash,
                tokenAddress: result.getAddress(),
                contractURL: `https://edu-chain-testnet.blockscout.com/address/${tokenContractAddress}`
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