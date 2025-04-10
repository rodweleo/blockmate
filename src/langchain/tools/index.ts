import { EduchainGetSmartContractTool } from './smart-contracts/get_smart_contract_tool';

import { Tool } from "@langchain/core/tools";
import * as dotenv from "dotenv";
import { EduchainAgentKit } from "@/agent";
import { EduchainCreateNFTTool, EduchainGetTokenInfoTool, EduchainGetTokensListTool, 
    EduchainCreateFungibleTokenTool,
    EduchainMintFungibleTokenTool,
    EduchainMintNonFungibleTool
} from "./tokens";
import { EduchainGetAddressNftBalanceTool } from "./balances";
import { EduchainSendEduTool, EduchainGetWalletBalanceTool, EduchainCreateWalletTool } from './wallet';

dotenv.config();

export function createEduchainTools(educhainKit: EduchainAgentKit): Tool[] {

    return [
        new EduchainGetTokenInfoTool(educhainKit),
        new EduchainGetAddressNftBalanceTool(educhainKit),
        new EduchainGetTokensListTool(educhainKit),
        new EduchainGetSmartContractTool(educhainKit),
        new EduchainCreateWalletTool(educhainKit),
        new EduchainSendEduTool(educhainKit),
        new EduchainGetWalletBalanceTool(educhainKit),
        new EduchainCreateFungibleTokenTool(educhainKit),
        new EduchainCreateNFTTool(educhainKit),
        new EduchainMintFungibleTokenTool(educhainKit),
        new EduchainMintNonFungibleTool(educhainKit)
    ]
}