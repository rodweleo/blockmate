import { NftBalanceResponse } from "../../../types";


export const get_nft_balance = async (
    address: string
): Promise<NftBalanceResponse> => {
    const url = `${process.env.EDUCHAIN_TESTNET_BASE_URL!}/api/v2/addresses/${address}/nft?type=ERC-721,ERC-404,CERC-1155`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}. message: ${response.statusText}`);
        }

        return await response.json() as NftBalanceResponse;
    } catch (error) {
        console.error("Failed to fetch address nft balance", error);
        throw error;
    }
};