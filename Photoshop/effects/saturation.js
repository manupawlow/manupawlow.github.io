const args = [
    { name: 'redSaturation', default: 255, min: 0, max: 255, type: 'range' },
    { name: 'greenSaturation', default: 255, min: 0, max: 255, type: 'range' },
    { name: 'blueSaturation', default: 255, min: 0, max: 255, type: 'range' },
];

function apply(imageData, elapsedTime, params) {
    const readData = imageData.data;

    const writeImageData = copyImageData(imageData);
    const writeData = writeImageData.data;
    for (let y = 0; y < imageData.height; y++) {
        for (let x = 0; x < imageData.width; x++) {
            let i = 4 * (x + y * imageData.width);
            writeData[i + 0] = readData[i + 0] * params.redSaturation / 255;
            writeData[i + 1] = readData[i + 1] * params.greenSaturation / 255;
            writeData[i + 2] = readData[i + 2] * params.blueSaturation / 255;
        }
    }

    return writeImageData;
}

const saturation = { 
    name: 'saturation', 
    displayName: 'Saturation', 
    apply, 
    args: [
        { name: 'redSaturation', default: 255, min: 0, max: 255, type: 'range' },
        { name: 'greenSaturation', default: 255, min: 0, max: 255, type: 'range' },
        { name: 'blueSaturation', default: 255, min: 0, max: 255, type: 'range' },
    ], 
};