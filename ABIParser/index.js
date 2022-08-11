
const API_BASE_URL = 'https://blockchain-af-api.azurewebsites.net' //'http://localhost:7071'
const RELATIVE_PARSED_PAGE = './parsed/' // '../parsed/';

let currentContract

const generateContractDiv = (contract) => {
    let contractDiv = document.createElement("div")
    contractDiv.id = 'contract-' + contract.Id
    contractDiv.classList.add('contract')
    contractDiv.classList.add('contract-item')

    let contractName = document.createElement("H2")
    contractName.innerHTML = contract.Name

    let contractVersion = document.createElement("span")
    contractVersion.innerHTML = 'v' + contract.Version

    let contractDescription = document.createElement("p")
    contractDescription.innerHTML = contract.Description

    contractDiv.appendChild(contractName)
    contractDiv.appendChild(contractVersion)
    contractDiv.appendChild(contractDescription)


    return contractDiv
}

const appendButtons = (contractDiv, contract) => {
    
    const copyIcon = '<span class="iconify-inline" data-width="20" data-height="15" data-icon="ant-design:copy-outlined"></span>'

    let editBtn = document.createElement('button')
    editBtn.innerHTML = 'Edit'
    editBtn.classList.add('edit')
    editBtn.addEventListener('click', () => {
        fillForm(contract)
        currentContract = contract
        modal.classList.add('visible')
    })
    
    let deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = 'Delete'
    deleteBtn.classList.add('delete')
    deleteBtn.addEventListener('click', () => {
        deleteContract(contract)
    })

    let copyAbiBtn = document.createElement('button')
    copyAbiBtn.innerHTML = 'Copy ABI'
    copyAbiBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(contract.ABI)
    })

    let copyCodeBtn = document.createElement('button')
    copyCodeBtn.innerHTML = 'Copy Source Code'
    copyCodeBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(contract.SourceCode)
    })

    let parseAbiBtn = document.createElement('button')
    parseAbiBtn.innerHTML = 'Parse ABI'
    parseAbiBtn.addEventListener('click', () => {
        window.open(RELATIVE_PARSED_PAGE + '?contract=' + contract.Hash, '_blank').focus()
    })

    contractDiv.appendChild(editBtn)
    contractDiv.appendChild(deleteBtn)
    contractDiv.appendChild(copyAbiBtn)
    contractDiv.appendChild(copyCodeBtn)
    contractDiv.appendChild(parseAbiBtn)
}

const appendContract = (parent, contract) => {
    let contractDiv = generateContractDiv(contract)

    appendButtons(contractDiv, contract)

    parent.appendChild(contractDiv)
}

const showContracts = async () => {
    
    const contractList = document.getElementById('contracts-list')

    while (contractList.lastElementChild) contractList.removeChild(contractList.lastElementChild);
    
    let response = await fetch(API_BASE_URL + '/api/get-contract')
    let contracts = await response.json()

    contracts.forEach(contract => appendContract(contractList, contract))
}

const fillForm = (contract) => {
    document.forms["contract-form"]["fname"].value = contract.Name
    document.forms["contract-form"]["fdescription"].value = contract.Description
    document.forms["contract-form"]["fversion"].value = contract.Version
    document.forms["contract-form"]["fabi"].value = contract.ABI
    document.forms["contract-form"]["fcode"].value = contract.SourceCode
    document.forms["contract-form"]["fcontractAddress"].value = contract.ContractAddress
}

const resetForm = () => {
    currentContract = null
    document.getElementById("contract-form").reset()
}

const postContract = async (contract) => {
    await fetch(API_BASE_URL + '/api/post-contract', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contract)
    })
}

const deleteContract = async (contract) => {
    await fetch(API_BASE_URL + '/api/delete-contract', {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contract)
    })

    showContracts()
}

window.onload = async () => {

    showContracts()

    const modal = document.querySelector('.modal')
    const openHandlers = document.querySelectorAll('.open-modal')
    const closeHandlers = document.querySelectorAll('.close-modal');
    
    openHandlers.forEach(openHandler => {
        openHandler.addEventListener('click', () => { resetForm(); modal.classList.add('visible'); })
    })
    
    closeHandlers.forEach(closeHandler => {
        closeHandler.addEventListener('click', () => modal.classList.remove('visible'))
    })

    document.getElementById('contract-form').addEventListener('submit', async (e) => {

        e.preventDefault()

        let body = {
            Name: document.forms["contract-form"]["fname"].value,
            Description: document.forms["contract-form"]["fdescription"].value,
            Version: document.forms["contract-form"]["fversion"].value,
            ABI: document.forms["contract-form"]["fabi"].value,
            SourceCode: document.forms["contract-form"]["fcode"].value,
            ContractAddress: document.forms["contract-form"]["fcontractAddress"].value,
            Hash: currentContract?.Hash
        }

        await postContract(body)

        showContracts()

        modal.classList.remove('visible')

        return false
    })
}