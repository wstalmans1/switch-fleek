declare global { interface Window { ethereum: any}}

export async function payWithMetamask(walletAddress: string, recipientAddress: string, amount: string) {
    if (!walletAddress) {
        console.log("Wallet not connected");
        return;
    }
    try {
        const transactionParameters ={
            to: recipientAddress, // Required except during contract publication.
            from: walletAddress, // Must match user's active address.
            value: '0x' + (parseFloat(amount) * 1e18).toString(16), // Convert to hex wei.
            //gas: '0x5208', // Optional: 21000 Gwei.
            //gasPrice: '0x09184e72a000', // Optional: 100 Gwei.
        };
        const txHash = await window.ethereum.request({method: 'eth_sendTransaction', params: [transactionParameters]});
        console.log('Transaction sent:', txHash);
    } catch (error) {console.error('Error sending transaction:', error)}    
}