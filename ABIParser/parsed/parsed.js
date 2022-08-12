const RELATIVE_PARSED_ERROR_PAGE = '../parse/';

let CONTRACT_ADDRESS;
let CONTRACT_ABI;

let conected = false

let buttons = []

const getContractFromDatabase = async (hash) => {
  let response = await fetch(API_BASE_URL + 'get-contract')
  let contracts = await response.json()
  console.log(hash)
  console.log(contracts)
  return contracts.filter(c => c.Hash === hash)[0]
}

window.addEventListener('load', async () => {

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  
  console.log(urlParams.get('contract'))
  let contract = await getContractFromDatabase(urlParams.get('contract'))
  console.log(contract)
  // CONTRACT_ABI = localStorage.getItem('contract-abi');
  // CONTRACT_ABI = abi_decompression(urlParams.get('abi'))
  CONTRACT_ABI = contract.ABI

  await parse(CONTRACT_ABI);

  // CONTRACT_ADDRESS = urlParams.get('contract-address');
  CONTRACT_ADDRESS = contract.ContractAddress

  if (isAddress(CONTRACT_ADDRESS)) document.getElementById('contract-address').value = CONTRACT_ADDRESS;

  document.getElementById('contract-address').addEventListener('input', (e) => { CONTRACT_ADDRESS = e.target.value })

  window.onscroll = () => { document.getElementById('top-btn').style.display = (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) ? "block" : "none" };

  buttons = [
    document.getElementById('connect-btn'), 
    document.getElementById('home-btn'), 
    document.getElementById('copylink-btn'), 
    document.getElementById('top-btn'), 
    document.getElementById('funcdropdown-btn'), 
    document.getElementById('contract-address')
  ]

  window.ethereum.on('networkChanged', (networkId) => {
    connect()
    alert('networkChanged ', networkId);
  });

  window.ethereum.on('disconnect', () => {
    clearProviderData()
  });

  const accounts = await new ethers.providers.Web3Provider(window.ethereum).listAccounts();
  if (accounts.length > 0)
    connect()
});

window.addEventListener('click', function(e){
  if (!conected && !buttons.some(b => b.contains(e.target)) && e.target.tagName.toLowerCase() != 'a'){
    alert("Connect your wallet to use the functions!")
  }
});

const updateProviderData = async (provider) => {
    const network = await provider.getNetwork();
    let networkData = getChainDataById(network.chainId)
    document.getElementById('network-description').innerHTML = 
    networkData.icon + ' Network ' + network.chainId + ' ' + networkData.name;
}

const clearProviderData = () => {
  document.getElementById('network-description').innerHTML = '[No network]';
}

const connect = async () => {
  
  disableAllForm(true, buttons);

  await window.ethereum.enable()

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = provider.getSigner();

  updateProviderData(provider);

  disableAllForm(false);

  conected = true;
}

const parse = async (abi) => {
    fetch(API_BASE_URL + 'ParseAbi', {
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

      disableAllForm(true, buttons);
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

const copyResponse = async (responseId) => {
  let txtarea = document.getElementById(responseId + '-textarea')
  let btn = document.getElementById(responseId + '-button')

  navigator.clipboard.writeText(txtarea.value)

  let prevHtml = btn.innerHTML
  console.log(prevHtml)
  btn.innerHTML = '<span class="iconify" data-icon="eva:checkmark-fill"></span>'
  await sleep(1500)
  btn.innerHTML = prevHtml
  // navigator.clipboard.writeText(document.getElementById(responseId).value);
  // alert('Copied response!');
}

const getChainDataById = (chainId) => {
  switch(chainId){
    
    //MAINNETS
    case 1:
      return {
        name: 'ethereum mainnet',
        icon: '<span class="iconify-inline" data-icon="cib:ethereum"></span>'
      };

    case 56:
      return {
        name: 'bnb mainnet',
        icon: '<span class="iconify-inline" data-icon="simple-icons:binance"></span>'
      };
    
    case 43113:
      return {
        name: 'avalanche mainnet',
        icon: '<object data="./public/avalanche-avax-logo.svg" width="15" height="15"> </object>'
      };
    
    case 137: 
      return {
        name: 'polygon mainnet',
        icon: '<span class="iconify-inline" data-icon="cryptocurrency:matic" style="color: #7e45de !important;"></span>'
      };

    //TESTNETS
    case 80001:
      return {
        name: 'polygon testnet Mumbai',
        icon: '<span class="iconify-inline" data-icon="cryptocurrency:matic" style="color: #7e45de !important;"></span>'
      };
    
    default:
      return { name: '', icon: '' };
  }
}

const copyLink = () => {
  const page = location.protocol + '//' + location.host + location.pathname
  navigator.clipboard.writeText(page + '?contract-address=' + CONTRACT_ADDRESS + '&abi=' + abi_compression(CONTRACT_ABI));
  alert('Copied page link!');
}