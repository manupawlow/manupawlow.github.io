// function apply(imageData, elapsedTime, params) {
//     const readData = imageData.data;

//     const writeImageData = copyImageData(imageData);
//     const writeData = writeImageData.data;

//     const kernelX = [
//         [-1, 0, 1],
//         [-2, 0, 2],
//         [-1, 0, 1],
//     ];

//     const kernelY = [
//         [-1, -2, -1],
//         [0, 0, 0],
//         [1, 2, 1],
//     ];


//     for (let y = 0; y < imageData.height; y++) {
//         for (let x = 0; x < imageData.width; x++) {

//             let index = 4 * (x + y * imageData.width);
//             let Gx = 0, Gy = 0;
            
//             for(let ky = 0; ky < 3; ky++) {
//                 for(let kx = 0; kx < 3; kx++) {

//                     let neighborX = x + kx - 1;
//                     let neighborY = y + ky - 1;

//                     if (!isOutsideBounds(neighborX, neighborY, 0, imageData.width - 1, 0, imageData.height - 1)) {
//                         let neighborIndex = 4 * (neighborX + neighborY * imageData.width);
//                         // r += readData[neighborIndex + 0] * kernelX[ky][kx];
//                         // g += readData[neighborIndex + 1] * kernelX[ky][kx];
//                         // b += readData[neighborIndex + 2] * kernelX[ky][kx];
//                         let gray = getGrayScale(readData[neighborIndex + 0], readData[neighborIndex + 1], readData[neighborIndex + 2]);
                        
//                         Gx += gray * kernelX[ky][kx] * params.Xedges;
//                         Gy += gray * kernelY[ky][kx]* params.Yedges;;
//                     }
//                 }
//             }
            
//             let G = Math.sqrt(Gx * Gx + Gy * Gy);

//             writeData[index + 0] = G;
//             writeData[index + 1] = G;
//             writeData[index + 2] = G;
//         }
//     }

//     return writeImageData;
// };

// const convolution = { 
//     name: 'edges',
//     displayName: 'Edges detection',
//     apply,
//     args: [
//         { name: 'Xedges', default: 1, min: 0, max: 1, type: 'range' },
//         { name: 'Yedges', default: 1, min: 0, max: 1, type: 'range' },
//     ],
// };

const BLUR_KERNEL = [0.002216, 0.008764, 0.026995, 0.064759, 0.120985, 0.176033, 0.199471, 0.176033, 0.120985, 0.064759, 0.026995, 0.008764, 0.002216];

function apply(imageData, elapsedTime, params) {
    const readData = imageData.data;
    const writeImageData = copyImageData(imageData);
    const writeData = writeImageData.data;
    
    const blurLevel = params.blurLevel; //1 - 7

    // const secondHalfKernel = BLUR_KERNEL.slice(0, blurLevel);
    // const firstHalfKernel = secondHalfKernel.slice(1, secondHalfKernel.length).reverse();
    // const kernel = firstHalfKernel.concat(secondHalfKernel);

    const kernel = BLUR_KERNEL;
    const kernelSize = kernel.length;
    const kernelRadious = parseInt(kernelSize / 2);

    for (let y = 0; y < imageData.height; y++) {
        for (let x = 0; x < imageData.width; x++) {

            let index = 4 * (x + y * imageData.width);
            let r = 0, g = 0, b = 0;

            for(let ky = 0; ky < kernelSize; ky++) {
                for(let kx = 0; kx < kernelSize; kx++) {

                    let neighborX = x + kx - kernelRadious;
                    let neighborY = y + ky - kernelRadious;

                    if (!isOutsideBounds(neighborX, neighborY, 0, imageData.width, 0, imageData.height)) {
                        let neighborIndex = 4 * (neighborX + neighborY * imageData.width);
                        r += readData[neighborIndex + 0] * kernel[kx] * kernel[ky];                        
                        g += readData[neighborIndex + 1] * kernel[kx] * kernel[ky];                        
                        b += readData[neighborIndex + 2] * kernel[kx] * kernel[ky];                        
                    }
                }
            }
            
            writeData[index + 0] = r;
            writeData[index + 1] = g;
            writeData[index + 2] = b;
        }
    }

    return writeImageData;
};

const blur = { 
    name: 'blur',
    displayName: 'Blur',
    apply,
    args: [
        { name: 'blurLevel', default: 3, min: 1, max: 7, type: 'range' },
    ],
};