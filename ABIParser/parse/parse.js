const REALTIVE_PARSED_PAGE = '../parsed';

const sendToParse = async () => {

    disableAllForm(true);

    document.getElementById('parser-btn').value = "Parsing...";

    const CONTRACT_ABI = document.getElementById('contract-abi').value;

    window.location = REALTIVE_PARSED_PAGE + '/?abi=' + abi_compression(CONTRACT_ABI);
}

// window.addEventListener('load', async () => {
//     var checkList = document.getElementById('list1');
//     checkList.getElementsByClassName('anchor')[0].onclick = function(evt) {
//       if (checkList.classList.contains('visible'))
//         checkList.classList.remove('visible');
//       else
//         checkList.classList.add('visible');
//     }
// })
