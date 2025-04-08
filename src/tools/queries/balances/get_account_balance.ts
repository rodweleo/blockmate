
export const get_account_balance = async (
    tokenAddress: string
) => {
    const url = `https://educhain.blockscout.com/api/v2/tokens/${tokenAddress}`;

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