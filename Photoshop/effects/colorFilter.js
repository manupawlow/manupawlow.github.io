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

    for (let y = 0; y < imageData.height; y++) {
        for (let x = 0; x < imageData.width; x++) {

            let i = 4 * (x + y * imageData.width);
            let r = readData[i];
            let g = readData[i + 1];
            let b = readData[i + 2];

            let filterR = r >= minFilterR && r < maxFilterR;
            let filterG = g >= minFilterG && r < maxFilterG;
            let filterB = b >= minFilterB && r < maxFilterB;

            let gray = r * .2126 + g * .7152 + b * .0722;
            writeData[i + 0] = filterR ? r : gray;
            writeData[i + 1] = filterG ? g : gray;
            writeData[i + 2] = filterB ? b : gray;       

            // if (filterR && filterG && filterB) {
            //     writeData[i + 0] = r;
            //     writeData[i + 1] = g;
            //     writeData[i + 2] = b;       
            // } else {
            //     let gray = r * .2126 + g * .7152 + b * .0722;
            //     writeData[i + 0] = gray;
            //     writeData[i + 1] = gray;
            //     writeData[i + 2] = gray;                      
            // }
        }
    }

    return writeImageData;
};

const colorFilter = { 
    name: 'colorFilter', 
    displayName: 'Color filter', 
    apply, 
    args: [
        { name: 'maxFilterR', default: 255, min: 0, max: 255, type: 'range' },
        { name: 'minFilterR', default: 0, min: 1, max: 255, type: 'range' },
        { name: 'maxFilterG', default: 255, min: 0, max: 255, type: 'range' },
        { name: 'minFilterG', default: 0, min: 1, max: 255, type: 'range' },
        { name: 'maxFilterB', default: 255, min: 0, max: 255, type: 'range' },
        { name: 'minFilterB', default: 0, min: 1, max: 255, type: 'range' },
    ], 
};