function apply(imageData, elapsedTime, params) {
    const readData = imageData.data;
    const writeImageData = copyImageData(imageData);
    const writeData = writeImageData.data;

    const a = params.amplitud / 255;
    const f = params.frecuency / 255;
    const p = params.phase / 255;

    for (let y = 0; y < imageData.height; y++) {
        for (let x = 0; x < imageData.width; x++) {

            let newX = x + parseInt(a * Math.sin(p * y + elapsedTime * 10 * f));
            
            let newY = y;

            let i = 4 * (x + y * imageData.width);
            let newi = 4 * (newX + newY * imageData.width);
            writeData[i] = readData[newi + 0];
            writeData[i + 1] = readData[newi + 1];
            writeData[i + 2] = readData[newi + 2];
        }
    }

    return writeImageData;
};

const sin = { 
    name: 'sin', 
    displayName: 'Sin', 
    apply, 
    args: [
        { name: 'amplitud', default: 255 * 25, min: 0, max: 255 * 50, type: 'range' },
        { name: 'frecuency', default: 255 * 3, min: 0, max: 255 * 5, type: 'range' },
        { name: 'phase', default: 32, min: 0, max: 128, type: 'range' },
    ], 
};