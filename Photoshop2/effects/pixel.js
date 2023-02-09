import * as utils from "../utils.js"; 

const params = { };

async function applyOnPixel(x, y, imageData, readData, elapsedTime, writeData) {
    let sumR = 0;
    let sumG = 0;
    let sumB = 0;
    let sumA = 0;
    let pixelCount = 0;
    for(let dh = -params.halfRadious; dh < params.halfRadious; dh++) {
        for(let dw = -params.halfRadious; dw < params.halfRadious; dw++) {
            if (!utils.isOutsideBounds(x + dw, y + dh, 0, imageData.width - 1, 0, imageData.height - 1)) {
                let index = 4 * ((x + dw) + (y + dh) * imageData.width);
                sumR += readData[index + 0];
                sumG += readData[index + 1];
                sumB += readData[index + 2];
                sumA += readData[index + 3];
                pixelCount++;
            }
        }
    }

    let avgR = sumR / pixelCount;
    let avgG = sumG / pixelCount;
    let avgB = sumB / pixelCount;
    let avgA = sumA / pixelCount;

    for(let dh = -params.halfRadious; dh < params.halfRadious; dh++) {
        for(let dw = -params.halfRadious; dw < params.halfRadious; dw++) {
            if (!utils.isOutsideBounds(x + dw, y + dh, 0, imageData.width, 0, imageData.height)) {
                let index = 4 * ((x + dw) + (y + dh) * imageData.width);
                writeData[index + 0] = avgR;
                writeData[index + 1] = avgG;
                writeData[index + 2] = avgB;
                writeData[index + 3] = avgA;
            }
        }
    }
}

function apply(imageData, writeImageData, elapsedTime) {
    const readData = imageData.data;
    // const writeImageData = copyImageData(imageData);
    const writeData = writeImageData.data;

    params.radious = params.radious == 0 ? 1 : params.radious;
    params.halfRadious = parseInt(params.radious / 2);

    let promises = [];

    for (let y = 0; y < imageData.height + params.radious; y += params.radious) {
        for (let x = 0; x < imageData.width + params.radious; x += params.radious) {
            promises.push(
                applyOnPixel(x, y, imageData, readData, elapsedTime, writeData)
            );
        }
    }

    Promise.all(promises);

    return writeImageData;
};

const div = document.createElement('div');
div.appendChild(utils.createTextInput('h3', 'Pixel'));
div.appendChild(utils.createTextInput('label', 'Pixel radious'));
div.appendChild(utils.createRangeInput(params, 'radious', 0, 100, 50, 2));

export default {
    name:'pixel', 
    displayName: 'Pixel', 
    apply: apply, 
    params: params,
    el: div,
};