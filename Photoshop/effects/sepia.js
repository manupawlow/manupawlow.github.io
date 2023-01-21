function apply(imageData, elapsedTime, params) {
    const readData = imageData.data;
    const writeImageData = copyImageData(imageData);
    const writeData = writeImageData.data;

    for (let y = 0; y < imageData.height; y++) {
        for (let x = 0; x < imageData.width; x++) {
            let i = 4 * (x + y * imageData.width);
            let r = readData[i];
            let g = readData[i + 1];
            let b = readData[i + 2];

            writeData[i + 0] = r * .399 + g * .769 + b * .189;
            writeData[i + 1] = r * .349 + g * .349 + b * .168;
            writeData[i + 2] = r * .272 + g * .272 + b * .131;
        }
    }

    return writeImageData;
};

const sepia = { 
    name: 'sepia', 
    displayName: 'Sepia', 
    apply, 
    args: [], 
};