


import { Tool } from "@langchain/core/tools";
import { EduchainAgentKit } from "../../../agent";

export class EduchainGetSmartContractTool extends Tool {
    name = 'educhain_get_smart_contract_tool'

    description = ` Get information of a smart contract on EduChain. Use this tool when you need to get information about a specific smart contract on the EduChain blockchain.
        ### **Inputs** (JSON string, required fields specified):
        - **address** (*string*, required): The evm address of the smart contract to check the details (e.g., "0x7bA0F2cb1608207031839F4273e4dBC8d88F33Cw").`

    constructor(private educhainKit: EduchainAgentKit) {
        super();
    }

    protected async _call(input: string): Promise<string> {
        try {
            console.log('educhain_get_smart_contract_tool tool has been called')

            const parsedInput = JSON.parse(input);
            if (!parsedInput.address) {
                throw new Error("Smart contract address is required");
            }

            const address = parsedInput.address;

            const res = await this.educhainKit.getSmartContract(address)

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