

import { Tool } from "@langchain/core/tools";
import { EduchainAgentKit } from "../../../../agent";

export class EduchainSendEduTool extends Tool {
    name = 'educhain_send_edu'

    description = ` Send EDU tokens from one wallet to another on EduChain. Use this tool when you need to transfer EDU tokens between wallets on the EduChain blockchain.
        ### **Inputs** (JSON string, required fields specified):
        - **to** (*string*, required): The evm address of the recipient wallet to send EDU tokens to (e.g., "0x7bA0F2cb1608207031839F4273e4dBC8d88F33Cw").
        - **amount** (required): The amount of EDU tokens to send (e.g., 100).
        - ** privateKey ** (* string *, required): The private key of the sender wallet(e.g., "0x7bA0F2cb1608207031839F4273e4dBC8d88F33Cw").
        `

    constructor(private educhainKit: EduchainAgentKit) {
        super();
    }

    protected async _call(input: string): Promise<string> {
        try {
            console.log('educhain_send_edu tool has been called')

            const parsedInput = JSON.parse(input);

            if (!parsedInput.to || !parsedInput.amount || !parsedInput.privateKey) {
                throw new Error("Recipient address, amount, and private key are required");
            }

            const to = parsedInput.to;
            const amount = String(parsedInput.amount);
            const privateKey = parsedInput.privateKey;

            const details = await this.educhainKit.sendEdu(privateKey, to, amount)

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