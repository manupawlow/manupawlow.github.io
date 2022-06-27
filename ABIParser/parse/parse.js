const REALTIVE_PARSED_PAGE = '../parsed';

const sendToParse = async () => {

    disableAllForm(true);

    document.getElementById('parser-btn').value = "Parsing...";

    const CONTRACT_ABI = document.getElementById('contract-abi').value;

    // localStorage.setItem('contract-abi', CONTRACT_ABI);

    window.location = REALTIVE_PARSED_PAGE + '/index.html?abi=' + abi_compression(CONTRACT_ABI);
}
