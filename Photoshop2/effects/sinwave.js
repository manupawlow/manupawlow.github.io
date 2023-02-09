import * as utils from "../utils.js"; 

const params = { };

function apply(imageData, writeImageData, elapsedTime) {
    const readData = imageData.data;
    const writeData = writeImageData.data;
    
    for (let y = 0; y < imageData.height; y++) {
        for (let x = 0; x < imageData.width; x++) {
            let newX = x + parseInt(params.amplitud * Math.sin(params.phase * y + elapsedTime * params.frecuency));
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

const div = document.createElement('div');
div.appendChild(utils.createTextInput('h3', 'Sin waves'));

div.appendChild(utils.createTextInput('label', 'Amplitud'));
div.appendChild(utils.createRangeInput(params, 'amplitud', 0, 100, 50));

div.appendChild(utils.createTextInput('label', 'Frecuency'));
div.appendChild(utils.createRangeInput(params, 'frecuency', 0, 10, 5));

div.appendChild(utils.createTextInput('label', 'Phase'));
div.appendChild(utils.createRangeInput(params, 'phase', 0, 5, 1, .2));

export default {
    name:'sinWaves', 
    displayName: 'Sin Waves', 
    apply: apply, 
    params: params,
    el: div,
};