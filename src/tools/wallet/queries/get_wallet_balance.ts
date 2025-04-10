
import { ethers } from "ethers";
import { eduTestnetProvider } from "../../../utils/educhain_providers";

export const getWalletBalance = async (walletAddress: `0x${string}`): Promise<string> => {
    try {
        // Get the balance in Wei
        const balanceInWei = await eduTestnetProvider.getBalance(walletAddress);

        // Convert from Wei to Ether (optional)
        const balanceInEther = ethers.formatEther(balanceInWei);

        return balanceInEther
    } catch (error) {
        console.error("Error fetching wallet balance:", error);
        throw error;
    }
}
