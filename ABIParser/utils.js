const RELATIVE_HOME_PAGE = '../parse';//'parse.html';
// const API_BASE_URL =
//     'https://blockchain-af-api.azurewebsites.net/api/ParseAbi'; 
//     // 'http://localhost:7071/api/ParseAbi';

const API_BASE_URL = 'https://blockchain-af-api.azurewebsites.net/api/'

const goHome = () => window.location.href = RELATIVE_HOME_PAGE;

function disableAllForm(disable, unDisable = []) {
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].disabled = disable;
    }
    var selects = document.getElementsByTagName("select");
    for (var i = 0; i < selects.length; i++) {
      selects[i].disabled = disable;
    }
    var textareas = document.getElementsByTagName("textarea");
    for (var i = 0; i < textareas.length; i++) {
      textareas[i].disabled = disable;
    }
    var buttons = document.getElementsByTagName("button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = disable;
    }
    
    let redirects = document.getElementById('function-redirects');
    if (redirects) redirects.disabled = disable;

    unDisable.forEach(element => element.disabled = !disable);
  }

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const isAddress = (address) => address && address.length === 42 && address[0] === '0' && address[1] === 'x';

  const listen_event = (eventId, e) => document.getElementById(eventId) = e.checked;

  const translation = [
    { key: '@0', word: '},{' },
    { key: '@1', word: '"inputs":' }, 
    { key: '@2', word: '"stateMutability":' },
    { key: '@3', word: '"type":' },
    { key: '@4', word: '"anonymous":' },
    { key: '@5', word: '"indexed":' },
    { key: '@6', word: '"internalType":' },
    { key: '@7', word: '"name":' },
    { key: '@8', word: '"payable"' },
    { key: '@9', word: '"nonpayable"' },
    { key: '@a', word: '"view"' },
    { key: '@b', word: '"event"' },
    { key: '@c', word: '"function"' },
    { key: '@d', word: '"constructor"' },
    { key: '@e', word: '"fallback"' },
    { key: '@f', word: '"address"' },
    { key: '@g', word: '"uint"' },
    { key: '@h', word: '"uint8"' },
    { key: '@i', word: '"address payable"' },
    { key: '@j', word: '"pure"' },
    { key: '@k', word: '"bool"' },
    { key: '@l', word: '"bytes"' },
    { key: '@m', word: '"bytes1"' },
    { key: '@n', word: '"bytes32"' },
    { key: '@o', word: '"int"' },
    { key: '@p', word: '"int8"' },
    { key: '@q', word: '"int256"' },
    { key: '@r', word: '"string"' },
    { key: '@s', word: '"withdraw"' },
    { key: '@t', word: 'true' },
    { key: '@u', word: 'false' },
    { key: '@v', word: '"outputs":' },
    { key: '@w', word: '"uint256"' },
    { key: '@x', word: '"enum' },
    // { key: '@v', word: '"int256"' },
  ]

  const abi_compression = (s) => {

    //translation.forEach(t => s = s.replaceAll(t.word, t.key))
    s = s.replaceAll(/\r/g, "").replaceAll(/\n/g, "").replaceAll(" ", "").replaceAll("\t", "")
    //translation.forEach(t => s = s.replaceAll(t.word, t.key))

    return LZString.compressToEncodedURIComponent(s)
  }

  const abi_decompression = (s) => {
    let de = LZString.decompressFromEncodedURIComponent(s)
    //translation.forEach(t => de = de.replaceAll(t.key, t.word))
    return de
  }
  
