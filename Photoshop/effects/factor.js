function apply(imageData, elapsedTime, params) {
    const readData = imageData.data;

    const writeImageData = copyImageData(imageData);
    const writeData = writeImageData.data;

    const factor = params.factor;
    console.log(factor);

    for (let y = 0; y < imageData.height; y++) {
        for (let x = 0; x < imageData.width; x++) {
            let i = 4 * (x + y * imageData.width);

            writeData[i + 0] = parseInt(readData[i + 0] * factor / 255) * 255 / factor;
            writeData[i + 1] = parseInt(readData[i + 1] * factor / 255) * 255 / factor;
            writeData[i + 2] = parseInt(readData[i + 2] * factor / 255) * 255 / factor;
        }
    }

    return writeImageData;
};

const factor = { 
    name: 'factor', 
    displayName: 'Color factor', 
    apply, 
    args: [
        { name: 'factor', default: 3, min: 2, max: 20, type: 'range' }
    ], 
};