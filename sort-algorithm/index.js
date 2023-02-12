const ctx = canvas.getContext('2d');
const margin = 2;

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function createArr(n, options = {}) {
    let arr = [];
    let first = options['first'] ?? 1;
    let step = options['step'] ?? 1
    for (let i = first; i <= n; i += step)
        arr[i] = i;
    if (options['random']) shuffleArray(arr);
    return arr;
}

function drawRectangles(arr, indexes = []) {
    let max = Math.max(...arr);
    let maxW = canvas.width / arr.length;
    for (let i = 0; i < arr.length; i++) {
        ctx.fillStyle = indexes.includes(i) ? "green" : "gray";
        ctx.fillRect(0 + maxW * i, canvas.height, maxW - margin, -canvas.height * arr[i] / max);
    }
}

async function init() {
    let arr = createArr(10, { random: true });
    drawRectangles(arr);

    await new Promise(r => setTimeout(r, 5000));

    const callback = async (indexes) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawRectangles(indexes);
        await new Promise(r => setTimeout(r, 500));
    }

    await bubbleSort(arr, callback);
}

init();

//SORTING
const swap = (arr, a, b) => {
    let aux = arr[a];
    arr[a] = arr[b];
    arr[b] = aux;
}

const c = async (indexes) => {
    console.log(arr);

}

const bubbleSort = async (arr, callback) => {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j+1]) {
                swap(arr, j, j+1);
                await callback([j, j+1]);
            }
        }
    }
}