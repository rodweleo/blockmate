import { EduchainGetSmartContractTool } from './smart-contracts/get_smart_contract_tool';

import { Tool } from "@langchain/core/tools";
import * as dotenv from "dotenv";
import { EduchainAgentKit } from "../../agent";
import { EduchainGetTokenInfoTool, EduchainGetTokensListTool } from "./tokens";
import { EduchainGetAddressNftBalanceTool } from "./balances";
import { EduchainCreateWalletTool } from './wallet/creation';
import { EduchainSendEduTool } from './wallet';

dotenv.config();

export function createEduchainTools(educhainKit: EduchainAgentKit): Tool[] {

    return [
        new EduchainGetTokenInfoTool(educhainKit),
        new EduchainGetAddressNftBalanceTool(educhainKit),
        new EduchainGetTokensListTool(educhainKit),
        new EduchainGetSmartContractTool(educhainKit),
        new EduchainCreateWalletTool(educhainKit),
        new EduchainSendEduTool(educhainKit)
    ]
}