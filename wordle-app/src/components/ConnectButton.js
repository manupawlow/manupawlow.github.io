
import * as React from 'react';
import { ethers } from 'ethers';

const ConnectButton = () => {
	
    async function connect() {
		try {
            
            await window.ethereum.enable()
            
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            
            const signer = provider.getSigner();

            console.log(signer);

        } catch (error) {
            console.error(error);
        }
	}

    //component return
     return (<>
        <button onClick={connect}>Connect wallet</button>
     </>)
        
}

export default ConnectButton;