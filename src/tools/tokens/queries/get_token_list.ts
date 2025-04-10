import { TokenInfo } from "../../../types";


export const get_token_list = async (): Promise<{
    items: TokenInfo[],
    next_page_params?: string | null
}> => {
    const url = `${process.env.EDUCHAIN_TESTNET_BASE_URL!}/api/v2/tokens`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}. message: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to fetch EduChain token details", error);
        throw error;
    }
};