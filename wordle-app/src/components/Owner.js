import * as React from 'react';
import { ethers } from 'ethers';
import { address, abi } from '../Words.js'; //TODO: PATH OF ADDRESS AND ABI

const Owner = () => {
    
    const [showResponse, setShowResponse] = React.useState(false);
    const [functionResponse, setFunctionResponse] = React.useState();

	//function owner() [view] returns address
	async function owner() {
    
		console.log("Executing owner...");

		try {

			const { ethereum } = window;

			if (ethereum) {

				const provider = new ethers.providers.Web3Provider(ethereum);

				const signer = provider.getSigner();

				let contract = new ethers.Contract(address, abi, signer);

				const receipt = await contract.owner();

				return receipt;
			}		

		} catch (error) {
			console.error(error);
			alert(error?.data?.message ?? 'Something went wrong');
		}
	}

	const onFinish = async () => {

		var response = await owner();

        setShowResponse(true);

        setFunctionResponse(response);
	 }

    const showInputs = () => {
        return (
            <button onClick={onFinish} className='send-button'>owner</button>
        )
    }

    const showOutputs = () => {
        return (
			<table className='response-table'>
				<thead>
					<tr>
						<td>owner response</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{functionResponse}</td>
					</tr>
				</tbody>
			</table>
		)
    }

	return (
        <div className='contract-function' id='owner-function' >
            {showResponse ? showOutputs() : showInputs()}
        </div>
    )
}

export default Owner;