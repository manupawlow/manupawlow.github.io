function apply(imageData, elapsedTime, params) {
    const readData = imageData.data;
    const writeImageData = copyImageData(imageData);
    const writeData = writeImageData.data;

    for (let y = 0; y < imageData.height; y++) {
        for (let x = 0; x < imageData.width; x++) {
            let i = 4 * (x + y * imageData.width);
            let gray = readData[i] * .2126 + readData[i + 1] * .7152 + readData[i + 2] * .0722;
            writeData[i] = gray; //readData[i] * .2126; // red
            writeData[i + 1] = gray; //readData[i + 1] * .7152; // green
            writeData[i + 2] = gray; //readData[i + 2] * 0722; // blue
        }
    }

    return writeImageData;
};

const gray = { 
    name: 'gray', 
    displayName: 'Gray', 
    apply, 
    args: [], 
};