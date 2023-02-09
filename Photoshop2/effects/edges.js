import * as utils from "../utils.js"; 

const params = { };

const kernelX = [
    [-1, 0, 1],
    [-2, 0, 2],
    [-1, 0, 1],
];

const kernelY = [
    [-1, -2, -1],
    [0, 0, 0],
    [1, 2, 1],
];

function apply(imageData, writeImageData, elapsedTime) {
    const readData = imageData.data;
    const writeData = writeImageData.data;

    for (let y = 0; y < imageData.height; y++) {
        for (let x = 0; x < imageData.width; x++) {

            let index = 4 * (x + y * imageData.width);
            let Gx = 0, Gy = 0;
            
            let GxR = 0, GxG = 0, GxB = 0;
            let GyR = 0, GyG = 0, GyB = 0;

            for(let ky = 0; ky < kernelY.length; ky++) {
                for(let kx = 0; kx < kernelX.length; kx++) {

                    let neighborX = x + kx - 1//kernelX.length / 2;
                    let neighborY = y + ky - 1//kernelY.length / 2;

                    if (!utils.isOutsideBounds(neighborX, neighborY, 0, imageData.width - 1, 0, imageData.height - 1)) {
                        let neighborIndex = 4 * (neighborX + neighborY * imageData.width);
                        
                        if (params.colored) {
                            GxR += readData[neighborIndex + 0] * kernelX[ky][kx] * params.Xedges;
                            GxG += readData[neighborIndex + 1] * kernelX[ky][kx] * params.Xedges;
                            GxB += readData[neighborIndex + 2] * kernelX[ky][kx] * params.Xedges;
    
                            GyR += readData[neighborIndex + 0] * kernelY[ky][kx] * params.Yedges;
                            GyG += readData[neighborIndex + 1] * kernelY[ky][kx] * params.Yedges;
                            GyB += readData[neighborIndex + 2] * kernelY[ky][kx] * params.Yedges;
                        } else {
                            let gray = utils.grayScale(readData[neighborIndex + 0], readData[neighborIndex + 1], readData[neighborIndex + 2]);
                            Gx += gray * kernelX[ky][kx] * params.Xedges;
                            Gy += gray * kernelY[ky][kx]* params.Yedges;
                        }
                    }
                }
            }

            let GR = params.colored ? Math.sqrt(GxR * GxR + GyR * GyR) :  Math.sqrt(Gx * Gx + Gy * Gy);
            let GG = params.colored ? Math.sqrt(GxG * GxG + GyG * GyG) :  Math.sqrt(Gx * Gx + Gy * Gy);
            let GB = params.colored ? Math.sqrt(GxB * GxB + GyB * GyB) :  Math.sqrt(Gx * Gx + Gy * Gy);

            if (params.invertColor) {
                GR = 255 - GR;               
                GG = 255 - GG;               
                GB = 255 - GB;               
            }

            writeData[index + 0] = GR;
            writeData[index + 1] = GG;
            writeData[index + 2] = GB;
        }
    }

    return writeImageData;
};

const div = document.createElement('div');
div.appendChild(utils.createTextInput('h3', 'Edge detector'));

div.appendChild(utils.createTextInput('label', 'X Edges'));
div.appendChild(utils.createCheckboxInput(params, 'Xedges', true));

div.appendChild(utils.createTextInput('label', 'Y Edges'));
div.appendChild(utils.createCheckboxInput(params, 'Yedges', true));

div.appendChild(utils.createTextInput('label', 'Colored'));
div.appendChild(utils.createCheckboxInput(params, 'colored', false));

div.appendChild(utils.createTextInput('label', 'Invert colors'));
div.appendChild(utils.createCheckboxInput(params, 'invertColor', false));

export default {
    name:'Edge', 
    displayName: 'Edge detector', 
    apply: apply, 
    params: params,
    el: div,
};