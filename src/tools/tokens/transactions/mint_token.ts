import { MintTokenOptions } from "@/types";
import { eduTestnetProvider } from "../../../utils/educhain_providers";
import { getFungibleTokenContractArtifact } from "../../../utils/functions/get_fungible_token_contract";
import { ContractTransactionResponse, ethers } from "ethers";

export const mint_token = async (options: MintTokenOptions) => {
    try{
        const contractArtifact = getFungibleTokenContractArtifact();
        const { abi } = contractArtifact

        let SIGNER = options.signer
        if(!options.signer){
            console.log("Private key not provided, using default agent operator...")
            SIGNER = process.env.EDUCHAIN_OPERATOR_PRIVATE_KEY!
        }

        const wallet = new ethers.Wallet(SIGNER!, eduTestnetProvider)

        const tokenContract = new ethers.Contract(options.tokenAddress, abi, wallet)

        const tx: ContractTransactionResponse = await tokenContract.mint(options.receiver, options.amount)
        return tx
    }catch(e){
        throw e
    }
}