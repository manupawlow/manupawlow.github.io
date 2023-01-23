function apply(imageData, elapsedTime, params) {
    const readData = imageData.data;

    const writeImageData = copyImageData(imageData);
    const writeData = writeImageData.data;

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

    const colored = params.color % 2 == 0;
    const invertColor = params.color < 2;

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

                    if (!isOutsideBounds(neighborX, neighborY, 0, imageData.width - 1, 0, imageData.height - 1)) {
                        let neighborIndex = 4 * (neighborX + neighborY * imageData.width);
                        
                        let gray = getGrayScale(readData[neighborIndex + 0], readData[neighborIndex + 1], readData[neighborIndex + 2]);
                        
                        GxR += readData[neighborIndex + 0] * kernelX[ky][kx] * params.Xedges;
                        GxG += readData[neighborIndex + 1] * kernelX[ky][kx] * params.Xedges;
                        GxB += readData[neighborIndex + 2] * kernelX[ky][kx] * params.Xedges;

                        GyR += readData[neighborIndex + 0] * kernelY[ky][kx] * params.Yedges;
                        GyG += readData[neighborIndex + 1] * kernelY[ky][kx] * params.Yedges;
                        GyB += readData[neighborIndex + 2] * kernelY[ky][kx] * params.Yedges;

                        Gx += gray * kernelX[ky][kx] * params.Xedges;
                        Gy += gray * kernelY[ky][kx]* params.Yedges;
                    }
                }
            }
            
            let GR = Math.sqrt(GxR * GxR + GyR * GyR);
            let GG = Math.sqrt(GxG * GxG + GyG * GyG);
            let GB = Math.sqrt(GxB * GxB + GyB * GyB);
            let G = Math.sqrt(Gx * Gx + Gy * Gy);

            if (invertColor) {
                GR = 255 - GR;               
                GG = 255 - GG;               
                GB = 255 - GB;               
                G = 255 - G;               
            }

            writeData[index + 0] = colored ? GR : G;
            writeData[index + 1] = colored ? GG : G;
            writeData[index + 2] = colored ? GB : G;
        }
    }

    return writeImageData;
};

const convolution = { 
    name: 'edges',
    displayName: 'Edges detection',
    apply,
    args: [
        { name: 'Xedges', default: 1, min: 0, max: 1, type: 'range' },
        { name: 'Yedges', default: 1, min: 0, max: 1, type: 'range' },
        { name: 'color', default: 1, min: 0, max: 3, type: 'range' },
    ],
};