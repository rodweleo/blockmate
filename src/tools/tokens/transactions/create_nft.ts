
import { BaseContract } from "ethers";
import { TokenOptions } from "@/types";
import { Token } from "../../../models";

export const create_nft = async (options: TokenOptions): Promise<BaseContract> => {

    //defining the token options
    const token = new Token({
        name: options.name,
        symbol: options.symbol,
        baseURI: options.baseURI,
        type: "NON-FUNGIBLE"
    })

    //deploy the token
    const txResult = await token.deploy()
    
    return txResult;
}