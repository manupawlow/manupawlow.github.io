//SETTINGS
const ABI_PARSER_URL = 'http://localhost:7071/api/GetPepe';

//FUNCTIONS
const connect = async () => {
    
    await window.ethereum.enable()
            
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    const signer = provider.getSigner();
}

const sendToParse = async () => {

    const addressEl = document.getElementById('contract-address');
    const abiEl = document.getElementById('contract-abi');
    const parseBtn = document.getElementById('parse-btn');
    
    //BEFORE PARSE
    parseBtn.disabled = true;

    //PARSING
    const address = addressEl.value;
    const abi = abiEl.value;
    
    parse(address, abi);
    
    //AFTER PARSE
    addressEl.hidden = true;
    abiEl.hidden = true;
    parseBtn.hidden = true;
}

const parse = async (address, abi) => {

    fetch(ABI_PARSER_URL, {
        method: 'GET',
        headers: {
          'api-key': 'im an api key',
          'Content-Type': 'application/json',
        },
        body: { abi },
      })
      .then(response => response.json())
      .then(data => {

        console.log('Success:\n', data);
        
        var divElm = document.createElement('div');
        var scriptElm = document.createElement('script');
        var styleElm = document.createElement('style');

        divElm.className = "html-container";
        scriptElm.type = "text/javascript";

        data.forEach(component => {
            divElm.innerHTML += component.html;
            scriptElm.innerHTML += component.js;
        });
        
        document.body.appendChild(divElm);
        document.body.appendChild(scriptElm);
        document.head.appendChild(styleElm);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
}