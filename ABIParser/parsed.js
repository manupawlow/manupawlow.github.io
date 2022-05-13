const RELATIVE_PARSED_ERROR_PAGE = 'parse.html';

const ABI_PARSER_URL =
    // 'https://blockchain-af-api.azurewebsites.net/api/GetPepe2?'; 
    'http://localhost:7071/api/GetPepe2';


let CONTRACT_ADDRESS;
let CONTRACT_ABI;

window.addEventListener('load', async () => {

    CONTRACT_ABI = localStorage.getItem('contract-abi');

    await parse(CONTRACT_ABI);

    CONTRACT_ADDRESS = localStorage.getItem('contract-address');

    if (isAddress(CONTRACT_ADDRESS)) document.getElementById('contract-address').value = CONTRACT_ADDRESS;

    document.getElementById('contract-address').addEventListener('input', (e) => {
        CONTRACT_ADDRESS = e.target.value;
        if (isAddress(CONTRACT_ADDRESS)) localStorage.setItem('contract-address', CONTRACT_ADDRESS);
    });
});

const updateProviderData = async (provider) => {
    
    const network = await provider.getNetwork();
    
    document.getElementById('network-description').innerHTML  = 
    getIconByChainId(network.chainId) + ' Network ' + network.chainId + ' ' + network.name;
}

const connect = async () => {
  
  disableAllForm(true, ['connect-btn', 'home-btn']);

  await window.ethereum.enable()

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  console.log(provider);

  const signer = provider.getSigner();

  updateProviderData(provider);

  disableAllForm(false);
}

const parse = async (abi) => {
    fetch(ABI_PARSER_URL, {
      method: 'POST',
      headers: {
        'api-key': 'im an api key',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ abi: abi }),
    })
    .then(response => {
      if (!response.ok) 
        throw new Error("status: " + response.status + ". Message: " + response.statusText);

      return response.json();
    })
    .then(data => {
      
      console.log(data);

      let redirects = document.getElementById('function-redirects');

      var divElm = document.createElement('div');
      var scriptElm = document.createElement('script');

      divElm.className = "parser-forms";
      scriptElm.type = "text/javascript";

      data.forEach(component => {
          redirects.innerHTML += "<a href='#" + component.name + "' class='a-" + component.mutability + "'>" + component.name + "</a>"
          divElm.innerHTML += "<section id='" + component.name + "'>" + "</section>" + component.html;
          scriptElm.innerHTML += component.js;
      });
      
      document.body.appendChild(divElm);
      document.body.appendChild(scriptElm);

      disableAllForm(true, ['connect-btn', 'home-btn']);
    })
    .catch(error => {
        console.error(error);
        alert(error.message);
        window.location.href = RELATIVE_PARSED_ERROR_PAGE;
    });
}

let open = false;
const showRefs = () => {
  document.getElementById('dropdown').setAttribute('data-rotate', open ? '90deg': '270deg');
  document.getElementById('function-redirects').hidden = open;
  open = !open;
}

const copyResponse = (responseId) => {
  navigator.clipboard.writeText(document.getElementById(responseId).value);
  alert('Copied response!');
}

const getIconByChainId = (chainId) => {
  switch(chainId){

    case 1: //ethereum mainnet
      return '<span class="iconify-inline" data-icon="cib:ethereum"></span>';

    case 56: //bnb mainnet
      return '<object data="./public/avalanche-avax-logo.svg" width="15" height="15"> </object>';
    
    case 43114: //avalanche mainnet 43114
      return '<object data="./public/avalanche-avax-logo.svg" width="15" height="15"> </object>';
    
    case 80001: //polygon testnet Mumbai
      return '<span class="iconify-inline" data-icon="cryptocurrency:matic" style="color: #7e45de !important;"></span>';
    
    default:
      return '';
  }
}