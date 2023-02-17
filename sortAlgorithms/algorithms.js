// const drawComparation = async (a, b) => {
//     comparations++;
//     executeDrawEvent([
//         [a, 'rgba(128,128,128,1)'], 
//         [b, 'rgba(128,128,128,1)'], 
//     ]);
//     await waitCallback();
// }

// const drawSwap = async (a, b) => {
//     swaps++;
//     executeDrawEvent([
//         [a, 'rgba(0,128,0,1)'], 
//         [b, 'rgba(0,128,0,1)'], 
//     ]);
//     await waitCallback();
// }

const paintAndWait = async (indexes, color, resetColors = true) => {
    paintIndexes(indexes, color, resetColors);
    executeDrawEvent();
    await waitCallback();
}

const swap = (arr, a, b) => {
    let aux = arr[a];
    arr[a] = arr[b];
    arr[b] = aux;
}

const isSorted = (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i+1]) return false;
    }
    return true;
}

//Bubble Sort
async function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (reset) return;
            comparations++;
            await paintAndWait([j, j+1], 'rgba(128,128,128,1)');
            if(arr[j] > arr[j+1]) {
                if (reset) return;
                swaps++;
                swap(arr, j, j+1);
                await paintAndWait([j, j+1], 'rgba(0,128,0,1)');
            }
        }
    }
    
    // let indexes = [];
    // for (let i = 0; i < arr.length; i++) {
    //     indexes.push([i, 'rgba(0,128,0,1)'])
    //     await renderCallback(indexes);
    //     await waitCallback();
    // }
}

//Selection Sort
async function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i;
        for (let j = i+1; j < arr.length; j++) {
            if (reset) return;
            comparations++;
            await paintAndWait([minIndex, j], 'rgba(128,128,128,1)');
            if (arr[minIndex] > arr[j]) {
                minIndex = j;
            }
        }

        if (reset) return;
        swaps++;
        swap(arr, i, minIndex);
        await paintAndWait([i, minIndex], 'rgba(0,128,0,1)');
    }
}

//Insertion Sort
async function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let j = i;
        if (reset) return;
        
        comparations++;
        while(arr[j-1] > arr[j] && j >= 0) {
            await paintAndWait([j, j-1], 'rgba(128,128,128,1)');
            if (reset) return;
            swaps++;
            swap(arr, j, j-1);
            await paintAndWait([j, j-1], 'rgba(0,128,0,1)');
            j--;
            comparations++;
        }
    }
}

//Bogo Sort
async function bogoSort(arr) {
    let sorted = false;
    while(true) {
        if (reset) return;
        sorted = true;
        for (let i = 0; i < arr.length - 1; i++) {
            comparations++;
            if (arr[i] > arr[i+1]) {
                sorted = false;
                break;
            }
        }

        if (!sorted) {
            swaps++;
            shuffleArray(arr);
            executeDrawEvent();
            await waitCallback();
        }
    }
}


//Merge Sort
const merge = async (arr, start, mid, high) => {
    let left = [];
    let right = [];

    paintIndexes([], '');
    
    for (let i=start; i <= high; i++) {
        comparations++;
        await paintAndWait([i], 'rgba(128,128,128,1)', false);
        if (i <= mid) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    let i=0; j=0; k=start;
    while(i < left.length && j < right.length) {
        // await drawComparation(j, j-1);
        if (left[i] < right[j]) {
            arr[k++] = left[i++];
        } else {
            arr[k++] = right[j++];
        }
        comparations++;
        await paintAndWait([k - 1], 'rgba(0,128,0,1)', false);
    }

    for (; i < left.length; i++) {
        swaps++;
        arr[k++] = left[i];
        await paintAndWait([k - 1], 'rgba(0,128,0,1)', false);
    }

    for (; j < right.length; j++) {
        swaps++;
        arr[k++] = right[j];
        await paintAndWait([k - 1], 'rgba(0,128,0,1)', false);
    }
}
const mergeSortAlgorithm = async (arr, low, high) => {
    if (low < high) {
        let mid = parseInt((high + low) / 2);
        await mergeSortAlgorithm(arr, low, mid);
        await mergeSortAlgorithm(arr, mid + 1, high);
        await merge(arr, low, mid, high);
    }
}
async function mergeSort(arr) {
    await mergeSortAlgorithm(arr, 0, arr.length - 1);
}

//Heap Sort
const heapify = async (arr, heapSize, root) => {
    let leftChildIndex = root * 2 + 1;
    let rightChildIndex = root * 2 + 2;

    let maxIndex = root;
    
    comparations++;
    await paintAndWait([leftChildIndex, maxIndex], 'rgba(128,128,128,1)');
    if (leftChildIndex < heapSize && arr[leftChildIndex] > arr[maxIndex]) {
        maxIndex = leftChildIndex;
    }
    
    comparations++;
    await paintAndWait([rightChildIndex, maxIndex], 'rgba(128,128,128,1)');
    if (rightChildIndex < heapSize && arr[rightChildIndex] > arr[maxIndex]) {
        maxIndex = rightChildIndex;
    }
    
    comparations++;
    if (maxIndex != root) {
        swaps++;
        swap(arr, root, maxIndex);
        await paintAndWait([root, maxIndex], 'rgba(0,128,0,1)');
        await heapify(arr, heapSize, maxIndex);
    }
}

async function heapSort(arr) {
    //create heap
    for (let i = parseInt(arr.length / 2) - 1; i >= 0; i--) {
        await heapify(arr, arr.length, i);
    }

    //sort
    for (let i = arr.length - 1; i > 0; i--) {
        // await paintAndWait([0, i], 'rgba(0,128,0,1)');
        swaps++;
        swap(arr, 0, i);
        await heapify(arr, i, 0);
    }
    await paintAndWait([], 'rgba(0,128,0,1)');
}

//Quick Sort
const partition = async (arr, low, high) => {
    let pivot = arr[low];
    let i=low, j=high;
    while(i < j) {
        do {
            i++;
            comparations++;
            await paintAndWait([i, low], 'rgba(128,128,128,1)');
        } while(arr[i] <= pivot);

        do {
            j--;
            comparations++;
            await paintAndWait([j, low], 'rgba(128,128,128,1)');
        } while(arr[j] > pivot);

        comparations++;
        await paintAndWait([i, j], 'rgba(128,128,128,1)');
        if (i < j) {
            swaps++;
            swap(arr, i, j);
            await paintAndWait([i, j], 'rgba(0,128,0,1)');
        }
    }

    swaps++;
    swap(arr, low, j);
    await paintAndWait([low, j], 'rgba(0,128,0,1)');
    return j;
}

const quickSortAlgorithm = async (arr, low, high) => {
    if (low < high) {
        let j = await partition(arr, low, high);
        await quickSortAlgorithm(arr, low, j);
        await quickSortAlgorithm(arr, j + 1, high);
    }
}

async function quickSort(arr)  {
    await quickSortAlgorithm(arr, 0, arr.length);
}

//Counting Sort
async function countingSort(arr) {

    let maxIndex = 0;
    for (let i = 1; i < arr.length; i++) {
        await paintAndWait([i, maxIndex], 'rgba(128,128,128,1)');
        if (arr[i] > arr[maxIndex]) {
            maxIndex = i;
        }
    }

    let max = arr[maxIndex];

    let counts = Array.from({length: max + 1}, (_, i) => 0); //size max + 1

    for (let i = 0; i < arr.length; i++) {
        await paintAndWait([i], 'rgba(128,128,128,1)');
        counts[arr[i]]++;
    }

    for (let i = 1; i < counts.length; i++) {
        counts[i] += counts[i - 1];
    }

    for (let i = counts.length - 1; i >= 0; i--) {
        counts[i] = counts[i - 1];
    }
    counts[0] = 0;
    
    let output = []; //size arr.length
    for (let i = 0; i < arr.length; i++) {
        await paintAndWait([i], 'rgba(128,128,128,1)');
        output[counts[arr[i]]++] = arr[i];
    }

    for (let i = 0; i < arr.length; i++) {
        await paintAndWait([i], 'rgba(0,128,0,1)');
        arr[i] = output[i];
    }
}

