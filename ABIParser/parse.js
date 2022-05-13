const REALTIVE_PARSED_PAGE = 'parsed.html';

const sendToParse = async () => {

    disableAllForm(true);

    const parseBtn = document.getElementById('parser-btn').value = "Parsing...";

    const CONTRACT_ABI = document.getElementById('contract-abi').value;

    localStorage.setItem('contract-abi', CONTRACT_ABI);

    window.location.href = REALTIVE_PARSED_PAGE;
}
