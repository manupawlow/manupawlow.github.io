import * as utils from "../utils.js"; 

const params = { };

function apply(imageData, writeImageData, elapsedTime) {
    const readData = imageData.data;
    const writeData = writeImageData.data;

    const factor = params.factor;

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

const div = document.createElement('div');
div.appendChild(utils.createTextInput('h3', 'Color factor'));

div.appendChild(utils.createTextInput('label', 'Factor'));
div.appendChild(utils.createRangeInput(params, 'factor', 0, 20, 3));

export default {
    name:'factor', 
    displayName: 'Color factor', 
    apply: apply, 
    params: params,
    el: div,
};