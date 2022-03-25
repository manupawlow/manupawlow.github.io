
const connect = async () => {
    
    await window.ethereum.enable()
            
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    const signer = provider.getSigner();
}
