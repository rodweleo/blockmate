

export const get_token_info = async (
    tokenAddress: string
) => {
    const url = `${process.env.EDUCHAIN_TESTNET_BASE_URL!}/api/v2/tokens/${tokenAddress}`;

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