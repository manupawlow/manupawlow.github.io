const RELATIVE_HOME_PAGE = '../parse';//'parse.html';

const goHome = () => window.location.href = RELATIVE_HOME_PAGE;

function disableAllForm(disable, unDisableIds = []) {
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

    unDisableIds.forEach(element => document.getElementById(element).disabled = !disable);
  }

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const isAddress = (address) => address && address.length === 42 && address[0] === '0' && address[1] === 'x';

  const listen_event = (eventId, e) => document.getElementById(eventId) = e.checked;

  const abi_compression = (s) => {
    return LZString.compressToEncodedURIComponent(
      s.replace(/\r/g, "").replace(/\n/g, "").replace("\t", "").replace(" ", "")
    )
  }

  const abi_decompression = (s) => {
    return LZString.decompressFromEncodedURIComponent(s)
  }
  
