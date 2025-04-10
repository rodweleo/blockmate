
import { BaseContract } from "ethers";
import { TokenOptions } from "@/types";
import { Token } from "../../../models";

export const create_fungible_token = async (options: TokenOptions): Promise<BaseContract> => {

    //defining the token options
    const token = new Token({
        name: options.name,
        symbol: options.symbol,
        initialSupply: options.initialSupply,
        maxSupply: options.maxSupply,
        decimals: options.decimals,
        type: "FUNGIBLE"
    })

    //deploy the token
    const txResult = await token.deploy()
    return txResult;
}