

//SETTINGS
const ABI_PARSER_URL =
  'https://blockchain-af-api.azurewebsites.net/api/GetPepe2?'; 
  // 'http://localhost:7071/api/GetPepe2';

//GLOBAL VARIABLES
let CONTRACT_ADDRESS = '';
let CONTRACT_ABI = '';

//PAGE FUNCTIONS


const connectWallet = () => {
  disableAllForm(true);

  connect();

  disableAllForm(false);
}

//PARSE FUNCTIONS
const connect = async () => {
  await window.ethereum.enable()
        
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = provider.getSigner();
}

const sendToParse = async () => {
  const abiFormsEl = document.getElementById('abi-forms');
  const addressEl = document.getElementById('contract-address');
  const abiEl = document.getElementById('contract-abi');
  const parseBtn = document.getElementById('parser-btn');
  
  //BEFORE PARSE
  parseBtn.disabled = true;
  parseBtn.value = "Parsing...";

  //PARSING
  CONTRACT_ADDRESS = addressEl.value;
  CONTRACT_ABI = abiEl.value;
  
  let success = await parse(CONTRACT_ADDRESS, CONTRACT_ABI);
  
  //AFTER PARSE
  if(success) {
    abiFormsEl.style.display = 'none';
    abiFormsEl.style.visibility = 'hidden';

    document.getElementById('connect-btn').style.visibility = "visible";

    connectWallet();

  } else {
    parseBtn.disabled = false;
  }
}

const parse = async (address, abi) => {
    let success = fetch(ABI_PARSER_URL, {
      method: 'POST',
      headers: {
        'api-key': 'im an api key',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ abi: abi }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("status: " + response.status + ". Message: " + response.statusText);
      }

      return response.json()
    })
    .then(data => {
      console.log("Response data\n", { data });
      
      var divElm = document.createElement('div');
      var scriptElm = document.createElement('script');
      var styleElm = document.createElement('style');

      divElm.className = "parser-forms";
      scriptElm.type = "text/javascript";

      data.forEach(component => {
          divElm.innerHTML += component.html;
          scriptElm.innerHTML += component.js;
      });
      
      document.body.appendChild(divElm);
      document.body.appendChild(scriptElm);
      document.head.appendChild(styleElm);

      return true;
    })
    .catch(error => {
      console.error(error);
      alert("Couldnt parse :(");
      return false;
    });

    return success;
}