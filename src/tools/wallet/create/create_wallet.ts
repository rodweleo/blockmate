import { ethers } from "ethers";
import { eduTestnetProvider } from "../../../utils/educhain_providers";
import { WalletInfo } from "../../../types";

//TODO: Implement flexibility in creating wallets on different networks
export const create_wallet = (): WalletInfo => {
    //creating a new wallet on testnet
    try {
        const wallet = ethers.Wallet.createRandom();
        const connectedWallet = wallet.connect(eduTestnetProvider)

        const walletInfo = {
            address: connectedWallet.address,
            mnemonic: connectedWallet.mnemonic?.phrase,
            privateKey: connectedWallet.privateKey,
            publicKey: connectedWallet.publicKey,
        }

        console.log("Wallet created successfully!")

        return walletInfo
    } catch (e) {
        throw new Error(`Failed to create wallet: ${e}`);
    }
}