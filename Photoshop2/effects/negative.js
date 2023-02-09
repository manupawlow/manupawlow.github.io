import * as utils from "../utils.js"; 

const params = { };

function apply(imageData, writeImageData, elapsedTime) {
    const readData = imageData.data;
    const writeData = writeImageData.data;

    for (let y = 0; y < imageData.height; y++) {
        for (let x = 0; x < imageData.width; x++) {
            let i = 4 * (x + y * imageData.width);
            writeData[i] = Math.abs(params.invertScale - readData[i]); // red
            writeData[i + 1] = Math.abs(params.invertScale - readData[i + 1]); // green
            writeData[i + 2] = Math.abs(params.invertScale - readData[i + 2]); // blue
        }
    }
    return writeImageData;
};

const div = document.createElement('div');
div.appendChild(utils.createTextInput('h3', 'Invert colors'));

div.appendChild(utils.createTextInput('label', 'Invert scale'));
div.appendChild(utils.createRangeInput(params, 'invertScale', 0, 255, 255));

export default {
    name:'invert', 
    displayName: 'Invert', 
    apply: apply, 
    params: params,
    el: div,
};