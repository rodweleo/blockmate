import { EduchainAgentKit } from '@/agent';

import { Tool, ToolRunnableConfig } from "@langchain/core/tools";
import { CallbackManagerForToolRun } from "@langchain/core/callbacks/manager";

export class EduchainMintNonFungibleTool extends Tool {
    name = 'educhain_mint_non_fungible_tool';

    description = `Mint Non-Fungible tokens to an account on EduChain
        Inputs (input is a JSON string):
        recipient: string, to whom should the NFT should be minted to e.g. 0xfBee521dCf745bbBaa033b9C565a79D94c0417eC
        nftTokenAddress: string, The contract address for the NFT token e.g. 0xfBee521dCf745bbBaa033b9C565a79D94c0417eC
`;

    constructor(private educhainKit: EduchainAgentKit) {
        super();
    }

    protected override async _call(input: any, _runManager?: CallbackManagerForToolRun, config?: ToolRunnableConfig): Promise<string> {
        try {
            const isCustodial = config?.configurable?.isCustodial === true;
            console.log(`educhain_mint_non_fungible_tool tool has been called (${isCustodial ? 'custodial' : 'non-custodial'})`);

            const parsedInput = JSON.parse(input);
            const { recipient, nftTokenAddress } = parsedInput;

            const txReceipt = await this.educhainKit
                .mintNFT(recipient, nftTokenAddress, isCustodial);

            return JSON.stringify({
                status: txReceipt.type === 2 ? "success" : "failed",
                ...txReceipt
            })
        } catch (error: any) {
            return JSON.stringify({
                status: "error",
                message: error.message,
                code: error.code || "UNKNOWN_ERROR",
            });
        }
    }
}