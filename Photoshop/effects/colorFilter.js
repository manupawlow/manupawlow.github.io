function apply(imageData, elapsedTime, params) {
    const readData = imageData.data;

    const writeImageData = copyImageData(imageData);
    const writeData = writeImageData.data;

    const maxFilterR = params.maxFilterR;
    const minFilterR = params.minFilterR;
    const maxFilterG = params.maxFilterG;
    const minFilterG = params.minFilterG;
    const maxFilterB = params.maxFilterB;
    const minFilterB = params.minFilterB;
    const maxFilterGray = params.maxFilterGray;
    const minFilterGray = params.minFilterGray;

    for (let y = 0; y < imageData.height; y++) {
        for (let x = 0; x < imageData.width; x++) {

            let i = 4 * (x + y * imageData.width);
            let r = readData[i];
            let g = readData[i + 1];
            let b = readData[i + 2];

            let filterR = r >= minFilterR && r < maxFilterR;
            let filterG = g >= minFilterG && r < maxFilterG;
            let filterB = b >= minFilterB && r < maxFilterB;

            let gray = (r + g + b) / 3;

            let filterGray = gray >= minFilterGray && gray < maxFilterGray;
            
            writeData[i + 0] = filterR ? r : filterGray ? gray : 0;
            writeData[i + 1] = filterG ? g : filterGray ? gray : 0;
            writeData[i + 2] = filterB ? b : filterGray ? gray : 0;

            // writeData[i + 0] = Math.max(Math.min(r, maxFilterR), minFilterR);
            // writeData[i + 1] = Math.max(Math.min(g, maxFilterG), minFilterG);
            // writeData[i + 2] = Math.max(Math.min(b, maxFilterB), minFilterR);

        }
    }

    return writeImageData;
};

const colorFilter = { 
    name: 'colorFilter', 
    displayName: 'Color filter', 
    apply, 
    args: [
        { name: 'maxFilterR', default: 254, min: 0, max: 255, type: 'range' },
        { name: 'minFilterR', default: 0, min: 0, max: 255, type: 'range' },
        { name: 'maxFilterG', default: 254, min: 0, max: 255, type: 'range' },
        { name: 'minFilterG', default: 0, min: 0, max: 255, type: 'range' },
        { name: 'maxFilterB', default: 254, min: 0, max: 255, type: 'range' },
        { name: 'minFilterB', default: 0, min: 0, max: 255, type: 'range' },
        { name: 'maxFilterGray', default: 255, min: 0, max: 255, type: 'range' },
        { name: 'minFilterGray', default: 0, min: 0, max: 255, type: 'range' },
    ], 
};