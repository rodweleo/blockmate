
import { EduchainAgentKit } from './../../../agent/index';
import { Tool } from "@langchain/core/tools";


export class HederaGetBalanceTool extends Tool {
    name = 'educhain_get_account_balance'

    description = `Retrieves the account balance of a specified EduChain account.  
If no input is given (empty JSON '{}'), it return 0

### **Inputs** (optional, input is a JSON string):  
- **accountAddress** (*string*, optional): The EduChain account address to check the balance for (e.g., "0xString").  
  - If omitted, the tool will return zero.  

### **Example Usage:**  
1. **Get balance of a specific account:**  
   '{ "accountId": "0xString" }'  
`

    constructor(private educhainKit: EduchainAgentKit) {
        super()
    }

    protected async _call(input: string): Promise<string> {
        try {
            console.log('educhain_get_account_balance tool has been called')

            const parsedInput = JSON.parse(input);

            const balance = await this.educhainKit.getHbarBalance(parsedInput?.accountAddress);

            return JSON.stringify({
                status: "success",
                balance: balance,
                unit: "HBAR"
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