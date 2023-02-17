const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const algorithmSelect = document.getElementById('algorithmSelect');
const shapeSelect = document.getElementById('shapeSelect');
const cpsRange = document.getElementById('cpsRange');
const elementsRange = document.getElementById('elementsRange');
const sortBtn = document.getElementById('sortBtn');
const pauseBtn = document.getElementById('pauseBtn');

let arr, comparations = 0, swaps = 0;
let executing = false, paused = true, reset = false;
let skipCount = 0;
let coloredIndexes = {};

const SHAPES = {
    'columns': () => {
        let max = Math.max(...arr);
        let maxW = canvas.width / arr.length;
        for (let i = 0; i < arr.length; i++) {
            ctx.fillStyle = coloredIndexes[i] ?? 'rgba(255,255,255,1)';
            ctx.fillRect(0 + maxW * i, canvas.height, maxW * .95, -canvas.height * arr[i] / max);
        }
    },
    'centerColumns': () => {
        let max = Math.max(...arr);
        let maxW = canvas.width / arr.length;
        for (let i = 0; i < arr.length; i++) {
            ctx.fillStyle = coloredIndexes[i] ?? 'rgba(255,255,255,1)';
            ctx.fillRect(
                maxW * i, 
                canvas.height / 2 - canvas.height * arr[i] / max / 2,
                maxW *.95, 
                canvas.height * arr[i] / max
            );
        }
    },
    'colors': () => {
        let max = Math.max(...arr);
        let maxW = canvas.width / arr.length;
        for (let i = 0; i < arr.length; i++) {
            let color = (arr[i] - 1) / (max - 1) * 255;
            console.log(color)
            ctx.fillStyle = 'hsl(' + color + ', 100%, 50%)';
            ctx.fillRect(
                maxW * i, 
                10,
                maxW, 
                canvas.height - 10
            );
        }

        // grid.forEach((row, y) => row.forEach((cellValue, x) => {
        //     ctx.fillStyle = 'hsl('+cellValue+', 100%, 50%)'
        //     ctx.fillRect(x, y, 1, 1)
        // }))
    },
}

// const ALGORITHMS = {
//     'bubbleSort': bubbleSort,
//     'bogoSort': bogoSort,
// }
function paintIndexes(indexes, color, resetColors = true) {
    if (resetColors) coloredIndexes = { };
    for (let i = 0; i < indexes.length; i++) {
        // coloredIndexes.push({ index: indexes[i], color: colors[i] });
        coloredIndexes[indexes[i]] = color; 
    }
}
function executeDrawEvent() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    SHAPES[shapeSelect.value]();
    
    let fontSize = 16;
    ctx.fillStyle = 'rgba(0,0,0,.5)'; //BACKGROUND_COLOR.replace('rgb', 'rgba').replace(')', ', .5)');
    ctx.fillRect(0, 0, fontSize * 25, fontSize * 5);
    ctx.fillStyle = 'white';
    ctx.font = fontSize + "px Courier New";
    ctx.fillText("Algorithm: " + algorithmSelect.options[algorithmSelect.selectedIndex].text, 10, fontSize);
    ctx.fillText("Elements: " + Math.pow(2, parseInt(elementsRange.value)), 10, fontSize * 2);
    ctx.fillText("Comparations: " + comparations, 10, fontSize * 3);
    ctx.fillText("Swaps: " + swaps, 10, fontSize * 4);
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
const createArray = (n) => Array.apply(null, {length: n}).map(Number.call, Number).map(x => x + 1);
const createRandomArray = (n) => {
    let newArr = createArray(n);
    shuffleArray(newArr);
    return newArr;
}

async function waitCallback() {
    let cps = Math.pow(2, parseInt(cpsRange.value));
    if (cps > 1000) {
        let totalWait = Math.round(cps / 1000);
        if (skipCount++ > totalWait) {
            await new Promise(r => setTimeout(r, 1));
            skipCount = 0;
        }
        // await new Promise(r => setTimeout(r, 1));
    } else {
        await new Promise(r => setTimeout(r, 1000 / cps));
    }
    while(paused && !reset) await new Promise(r => setTimeout(r, 100));
}

function resetEvent(withNewArray = false) {
    sortBtn.disabled = false;
    reset = true;
    pauseBtn.hidden = true;
    pauseBtn.innerHTML = 'Stop';
    comparations = 0;
    swaps = 0;
    if (withNewArray) arr = createRandomArray(Math.pow(2, parseInt(elementsRange.value)));
    executeDrawEvent();
}

//inputs event
algorithmSelect.addEventListener('change', () => resetEvent(true));
shapeSelect.addEventListener('change', resetEvent);
elementsRange.addEventListener('input', (e) => {
    cpsRange.max = parseInt(parseInt(elementsRange.value) * 1.5);
    cpsRange.value = parseInt(elementsRange.value) / 2;
    resetEvent(true)
});

sortBtn.addEventListener('click', async (e) => {
    sortBtn.disabled = true;
    algorithmSelect.disabled = true;
    shapeSelect.disabled = true;
    // cpsRange.disabled = true;
    elementsRange.disabled = true;

    paused = false;
    pauseBtn.innerHTML = 'Stop';
    pauseBtn.hidden = false;
    
    reset = false;
    // await ALGORITHMS[algorithmSelect.value](arr, executeDrawEvent, waitCallback);
    await window[algorithmSelect.value](arr, executeDrawEvent, waitCallback);
    reset = false;

    paused = false;
    pauseBtn.innerHTML = 'Stop';
    pauseBtn.hidden = true;

    sortBtn.disabled = false;
    algorithmSelect.disabled = false;
    shapeSelect.disabled = false;
    elementsRange.disabled = false;

    coloredIndexes = {};
    executeDrawEvent();
});
pauseBtn.addEventListener('click', (e) => {
    paused = !paused;
    pauseBtn.innerHTML = paused ? 'Continue' : 'Stop';
    // sortBtn.disabled = !paused;
    algorithmSelect.disabled = !paused;
    shapeSelect.disabled = !paused;
    // cpsRange.disabled = !paused;
    elementsRange.disabled = !paused;
});

async function init() {
    canvas.width  = window.innerWidth * .9;
    canvas.height = window.innerHeight * .8;
    window.addEventListener('resize', () => { 
        canvas.width  = window.innerWidth * .9; 
        canvas.height = window.innerHeight * .8;
        executeDrawEvent();
    });
    arr = createRandomArray(Math.pow(2, parseInt(elementsRange.value)));
    executeDrawEvent();

    await new Promise(r => setTimeout(r, 2000));

    // while(true) {
    //     await algorithms[algorithmSelect.value](arr, renderCallback);
    //     reset = false;
    //     console.log("asdasd");
    // }
}

init();