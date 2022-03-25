import * as React from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../contract-data'; //TODO: PATH OF ADDRESS AND ABI
// import './contract-functions.css';

const OwnerOf = () => {

    const [showResponse, setShowResponse] = React.useState(false);
    const [functionResponse, setFunctionResponse] = React.useState();
	
	//function ownerOf(uint256 tokenId) [view] returns address
	async function ownerOf(tokenId) {
    
		console.log("Executing ownerOf...");

		try {

			const { ethereum } = window;

			if (ethereum) {

				const provider = new ethers.providers.Web3Provider(ethereum);

				const signer = provider.getSigner();

				let contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

                console.log(tokenId);
                
				const receipt = await contract.ownerOf(tokenId);

				return receipt;
			}		

		} catch (error) {

			console.error(error);

			alert(error?.data?.message ?? 'Something went wrong');
		}
	}
	const onFinish = async () => {

		let tokenId = document.getElementById('tokenId').value;

		var response = await ownerOf(tokenId);
		
        setShowResponse(true);

        setFunctionResponse(response);
	}

    const showInputs = () => {
        return (
        <>
            <input id="tokenId" type="number" placeholder="tokenId" className="function-input" />

            <button onClick={onFinish} className='function-btn'>ownerOf</button>
        </>
        )
    }

	const showOutputs = () => {
		return (
			<table className='contract-table'>
				<thead className='contract-table-header'>
					<tr>
						<td>ownerOf response</td>
						<td>ownerOf response2</td>
					</tr>

				</thead>
				<tbody className='contract-table-body'>
					<tr>
						<td id="function-response">{functionResponse}</td>
						{/* <td><button onClick={() => { var copied = document.getElementById('function-response').innerText; navigator.clipboard.writeText(copied); console.log(copied); } }>Copy text</button></td> */}
						<td>PEPEEEE</td>
					</tr>
					<tr className='contract-table-row'>
						<td>{functionResponse}</td>
						<td>PEPEEEE</td>
					</tr>
				</tbody>
			</table>
		)
	}

	return (
        <div className='function-body' id='owner-function' >
            {showResponse ? showOutputs() : showInputs()}
        </div>
    )
}

export default OwnerOf;