
import { ethers, TransactionReceipt } from "ethers";
import { eduTestnetProvider } from "../../../utils/educhain_providers";
import { TransactionSummary } from "../../../types";

export const send_edu = async (
    privateKey: string,
    toAddress: string,
    amount: string
): Promise<TransactionSummary> => {
    try {


        const wallet = new ethers.Wallet(privateKey, eduTestnetProvider);

        // Convert amount to wei
        const amountWei = ethers.parseEther(amount);

        // Create and send transaction
        const tx = await wallet.sendTransaction({
            to: toAddress,
            value: amountWei
        });

        // Wait for transaction to be mined
        const receipt: TransactionReceipt | null = await tx.wait();

        if (!receipt) {
            throw new Error('Transaction failed');
        }

        return {
            hash: tx.hash,
            from: wallet.address,
            to: toAddress,
            amount
        };
    } catch (error) {
        console.error('Error sending EDU:', error);
        throw error;
    }
}