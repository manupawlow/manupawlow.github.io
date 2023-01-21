function apply(imageData, elapsedTime, params) {
    const readData = imageData.data;
    const writeImageData = copyImageData(imageData);
    const writeData = writeImageData.data;

    for (let y = 0; y < imageData.height; y++) {
        for (let x = 0; x < imageData.width; x++) {
            let i = 4 * (x + y * imageData.width);
            writeData[i] = 255 - readData[i]; // red
            writeData[i + 1] = 255 - readData[i + 1]; // green
            writeData[i + 2] = 255 - readData[i + 2]; // blue
        }
    }
    return writeImageData;
}; 

const invert = { name: 'invert', displayName: 'invert', apply, args: [], };