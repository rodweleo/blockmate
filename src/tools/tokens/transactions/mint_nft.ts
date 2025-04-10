import { MintTokenOptions } from "@/types";
import { eduTestnetProvider } from "../../../utils/educhain_providers";
import { ContractTransactionResponse, ethers } from "ethers";
import { getNftContractArtifact } from "../../../utils/functions/get_nft_contract";

export const mint_nft = async (options: MintTokenOptions) => {
    try{
        const contractArtifact = getNftContractArtifact();
        const { abi } = contractArtifact

        let SIGNER = options.signer
        if(!options.signer){
            console.log("Private key not provided, using default agent operator...")
            SIGNER = process.env.EDUCHAIN_OPERATOR_PRIVATE_KEY!
        }

        const wallet = new ethers.Wallet(SIGNER!, eduTestnetProvider)

        const tokenContract = new ethers.Contract(options.tokenAddress, abi, wallet)

        const tx: ContractTransactionResponse = await tokenContract.mintNFT(options.receiver)
        return tx
    }catch(e){
        throw e
    }
}