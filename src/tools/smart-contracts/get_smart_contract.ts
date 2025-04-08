import { SmartContract } from "../../types";


export const get_smart_contract = async (
    address: string
): Promise<SmartContract> => {

    if (!address) {
        throw new Error("Missing address parameter. Please provide a valid address.");
    }

    const url = `${process.env.EDUCHAIN_TESTNET_BASE_URL!}/api/v2/smart-contracts/${address}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}. message: ${response.statusText}`);
        }

        return await response.json()
    } catch (error) {
        console.error("Failed to fetch smart contract:", error);
        throw error;
    }
};