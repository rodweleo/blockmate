import { EduchainAgentKit } from '@/agent';

import { Tool, ToolRunnableConfig } from "@langchain/core/tools";
import { CallbackManagerForToolRun } from "@langchain/core/callbacks/manager";

export class EduchainMintFungibleTokenTool extends Tool {
    name = 'educhain_mint_fungible_token';

    description = `Mint fungible tokens to an account on EduChain
        Inputs (input is a JSON string):
        tokenAddress: string, the token address to mint e.g. 0xfBee521dCf745bbBaa033b9C565a79D94c0417eC,
        amount: number, the amount of tokens to mint e.g. 100,
        receiver: string, to whom should the tokens be sent to e.g. 0xfBee521dCf745bbBaa033b9C565a79D94c0417eC
        Example usage:
        1. Mint 100 of token 0xfBee521dCf745bbBaa033b9C565a79D94c0417eC to account 0x55a487E6283143865e48523215C85f1DA354EB07:
        '{
            "tokenAddress": "0xfBee521dCf745bbBaa033b9C565a79D94c0417eC",
            "amount": 100
        }'
`;

    constructor(private educhainKit: EduchainAgentKit) {
        super();
    }

    protected override async _call(input: any, _runManager?: CallbackManagerForToolRun, config?: ToolRunnableConfig): Promise<string> {
        try {
            const isCustodial = config?.configurable?.isCustodial === true;
            console.log(`educhain_mint_fungible_token tool has been called (${isCustodial ? 'custodial' : 'non-custodial'})`);

            const parsedInput = JSON.parse(input);
            const {tokenAddress, receiver, amount} = parsedInput;

            const txReceipt = await this.educhainKit
                .mintToken(tokenAddress, amount, receiver , isCustodial);

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