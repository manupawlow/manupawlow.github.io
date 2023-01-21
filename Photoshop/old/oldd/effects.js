const getArgs = (arguments) => {
    return {
        imageData: arguments[0],
        originalData: arguments[0].data,
        editedImageData: arguments[1],
        editedData: arguments[1].data,
        elapsedTime: arguments[2],
    }
}

const invert = (...arguments) => {
    const { imageData, originalData, editedImageData, editedData, elapsedTime } = getArgs(arguments);

    for (let i = 0; i < originalData.length; i += 4) {
        editedData[i] = 255 - originalData[i]; // red
        editedData[i + 1] = 255 - originalData[i + 1]; // green
        editedData[i + 2] = 255 - originalData[i + 2]; // blue
    }
    return editedImageData;
};

const isOutsideBounds = (x, y, left, rigth, top, down) => (x <= left || y <= top || y > down || x > rigth);

const pixel = (...arguments) => {
    const { imageData, originalData, editedImageData, editedData, elapsedTime } = getArgs(arguments);

    const radious = arguments[3];
    const halfRadious = parseInt(radious / 2);

    for (let y = 0; y <= imageData.height + halfRadious; y += radious) {
        for (let x = 0; x <= imageData.width + halfRadious; x += radious) {
            let sumR = 0;
            let sumG = 0;
            let sumB = 0;
            let pixelCount = 0;
            for(let dh = -halfRadious; dh < halfRadious; dh++) {
                for(let dw = -halfRadious; dw < halfRadious; dw++) {
                    if (!isOutsideBounds(x + dw, y + dh, 0, imageData.width - 1, 0, imageData.height - 1)) {
                        let index = 4 * ((x + dw) + (y + dh) * imageData.width);
                        sumR += originalData[index + 0]// * data[index + 3] / 255;
                        sumG += originalData[index + 1]// * data[index + 3] / 255;
                        sumB += originalData[index + 2]// * data[index + 3] / 255;
                        pixelCount++;
                    }
                }
            }

            let avgR = sumR / pixelCount; //(radious * radious);
            let avgG = sumG / pixelCount; //(radious * radious);
            let avgB = sumB / pixelCount; //(radious * radious);

            for(let dh = -halfRadious; dh < halfRadious; dh++) {
                for(let dw = -halfRadious; dw < halfRadious; dw++) {
                    if (!isOutsideBounds(x + dw, y + dh, 0, imageData.width, 0, imageData.height)) {
                        let index = 4 * ((x + dw) + (y + dh) * imageData.width);
                        editedData[index + 0] = avgR;
                        editedData[index + 1] = avgG;
                        editedData[index + 2] = avgB;
                    }
                }
            }
        }
    }
    return editedImageData;
};

const blurEffect = (...arguments) => {
    const { imageData, originalData, editedImageData, editedData, elapsedTime } = getArgs(arguments);

    const kernel = [0.002216, 0.008764, 0.026995, 0.064759, 0.120985, 0.176033, 0.199471, 0.176033, 0.120985, 0.064759, 0.026995, 0.008764, 0.002216];
    const kernelSize = 13;
    const kernelRadious = 6;

    for (let y = 0; y <= imageData.height; y++) {
        for (let x = 0; x <= imageData.width; x++) {
            let r = 0;
            let g = 0;
            let b = 0;

            for(let ky = 0; ky < kernelSize; ky++) {
                for(let kx = 0; kx < kernelSize; kx++) {

                    let y_pos = y + ky - kernelRadious;
                    let x_pos = x + kx - kernelRadious;

                    if (!isOutsideBounds(x_pos, y_pos, 0, imageData.width - 1, 0, imageData.height - 1)) {
                        let index = 4 * (x_pos + y_pos * imageData.width);
                        r += originalData[index + 0] * kernel[kx] * kernel[ky];
                        g += originalData[index + 1] * kernel[kx] * kernel[ky];
                        b += originalData[index + 2] * kernel[kx] * kernel[ky];
                    }
                }
            }

            let index = 4 * (x + y * imageData.width);
            editedData[index + 0] = r;
            editedData[index + 1] = g;
            editedData[index + 2] = b;
        }
    }

    return editedImageData;
};

const colorFactorEffect = (...arguments) => {
    const { imageData, originalData, editedImageData, editedData, elapsedTime } = getArgs(arguments);

    const factor = arguments[3];
    
    for (let i = 0; i < originalData.length; i += 4) {
        editedData[i] = parseInt(originalData[i] * factor / 255) * 255 / factor;
        editedData[i + 1] = parseInt(originalData[i + 1] * factor / 255) * 255 / factor;;
        editedData[i + 2] = parseInt(originalData[i + 2] * factor / 255) * 255 / factor;;
    }
    // ctx.putImageData(imageData, imgInfo.x, imgInfo.y);
    return editedImageData;
}

const colorSwitchEffect = (...arguments) => {
    const { imageData, originalData, editedImageData, editedData, elapsedTime } = getArgs(arguments);

    for (let i = 0; i < originalData.length; i += 4) {
        let r = originalData[i];
        let g = originalData[i + 1];
        let b = originalData[i + 2];

        editedData[i] = b;
        editedData[i + 1] = r;
        editedData[i + 2] = g;
    }
    // ctx.putImageData(imageData, imgInfo.x, imgInfo.y);
    return editedImageData;
}

const sinEffect = (...arguments) => {

    const { imageData, originalData, editedImageData, editedData, elapsedTime } = getArgs(arguments);

    for (let i = 0; i < originalData.length; i += 4) {
        let r = originalData[i];
        let g = originalData[i + 1];
        let b = originalData[i + 2];

        editedData[i] = Math.sin(elapsedTime * 0.1) * 255;
    }
    // ctx.putImageData(imageData, imgInfo.x, imgInfo.y);
    return editedImageData;
}

const moduleEffect = (...arguments) => {

    const { imageData, originalData, editedImageData, editedData, elapsedTime } = getArgs(arguments);

    for (let i = 0; i < originalData.length; i += 4) {
        let r = originalData[i];
        let g = originalData[i + 1];
        let b = originalData[i + 2];

        editedData[i] = (r % 20) * 255;
        editedData[i + 1] = (g % 20) * 255;
        editedData[i + 2] = (b % 20) * 255;

    }
    // ctx.putImageData(imageData, imgInfo.x, imgInfo.y);
    return editedImageData;
}

const distance = (...arguments) => {
    const { imageData, originalData, editedImageData, editedData, elapsedTime } = getArgs(arguments);

    let center = { x: imageData.width / 2, y: imageData.height / 2 };

    for (let y = 0; y <= imageData.height; y++) {
        for (let x = 0; x <= imageData.width; x++) {
            let dist = Math.sqrt((x - center.x) * (x - center.x) + (y - center.y) * (y - center.y))

            let i = 4 * (x + y * imageData.width);

            let r = originalData[i];
            let g = originalData[i + 1];
            let b = originalData[i + 2];
            
            editedData[i] = (dist % 50) * r * 0.01;
            editedData[i + 1] = (dist % 50) * g * 0.01;
            editedData[i + 2] = (dist % 50) * b * 0.01;
        }
    }
    return editedImageData;
};

const grid = (...arguments) => {
    const { imageData, originalData, editedImageData, editedData, elapsedTime } = getArgs(arguments);

    const gridSpace = arguments[3];
    const gridSize = arguments[4];

    for (let y = 0; y <= imageData.height; y++) {
        for (let x = 0; x <= imageData.width; x++) {
            let i = 4 * (x + y * imageData.width);

            let r = originalData[i];
            let g = originalData[i + 1];
            let b = originalData[i + 2];

            let isGrid = (x % gridSpace < gridSize || y % gridSpace < gridSize) ? 0 : 1;

            editedData[i] = r * isGrid;
            editedData[i + 1] = g * isGrid;
            editedData[i + 2] = b * isGrid;
        }
    }
    return editedImageData;
};

const convolution = (...arguments) => {
    const { imageData, originalData, editedImageData, editedData, elapsedTime } = getArgs(arguments);

    const convolution = arguments[3].split(";").map(e => e.split(" ").map(Number));
    const convolutionSize = convolution.length; 

    for (let y = 0; y <= imageData.height; y++) {
        for (let x = 0; x <= imageData.width; x++) {
            let r = 0;
            let g = 0;
            let b = 0;

            for(let ky = 0; ky < convolutionSize; ky++) {
                for(let kx = 0; kx < convolutionSize; kx++) {
                    if (!isOutsideBounds(x, y, 0, imageData.width - 1, 0, imageData.height - 1)) {
                        let index = 4 * (x + y * imageData.width);
                        r += originalData[index + 0] * convolution[ky][kx];
                        g += originalData[index + 1] * convolution[ky][kx];
                        b += originalData[index + 2] * convolution[ky][kx];
                    }
                }
            }

            let index = 4 * (x + y * imageData.width);
            editedData[index + 0] = r;
            editedData[index + 1] = g;
            editedData[index + 2] = b;
        }
    }
    return editedImageData;
}

const ascii = (...arguments) => {
    const { imageData, originalData, editedImageData, editedData, elapsedTime } = getArgs(arguments);

    const availableCharacters = {
        'low':    "#+- " + " ", //4
        
        'medium': "@#=+:-. " + "  ", //8

        'high': "▓▒░%@$0±+=o;:-. " + "   ", //16
        
        'very high': "█▓▒░Ñ@#W$9876543210?!abc;:+=-,. " + "   ", //32

        'black and white': "█ ",

        // 'low': ["█", "#", "=", ":", "-", " "],
        // 'high': [ "█", "▓", "▒", "░", "#", "@", "±", "=", "+", ":", "-", "°", ".", " "],
        // 'black and white': ["█", " "]
    };

    const characters = availableCharacters[arguments[3]] ?? arguments[3];
    const fontSize = arguments[4];
    // ctx.font = fontSize + "px Courier New";
    
    // const fontSize = 7;
    ctx.font = fontSize + "px Courier New";

    let screen = [];
    let i=0;
    for (let y = 0; y < imageData.height; y += fontSize) {
        screen.push([]);
        for (let x = 0; x < imageData.width; x += fontSize/2) {
            let index = 4 * (x + y * imageData.width);
            let gray = originalData[index + 4] == 0 ? 255 : originalData[index] * .2126 + originalData[index + 1] * .7152 + originalData[index + 2] * .0722;

            let charIndex = parseInt(gray * (characters.length-1) / 255);
            if (characters[charIndex] == undefined) console.log(originalData[index]);
            screen[i].push(characters[charIndex]);
        }
        i++;
    }

    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.fillStyle = 'white';
    for (let i = 0; i < screen.length; i++) {
        for (let j = 0; j < screen[i].length; j++) {
            ctx.fillText(screen[i][j], imgInfo.x + j * fontSize/2, imgInfo.y + i * fontSize + fontSize);
        }
    }

    let w = canvas.width / screen[0].length;
    let h = canvas.height / screen.length;

    console.log('Cada char ocupa', w, h)

    // ctx.fillText(screen, imgInfo.x, imgInfo.y + fontSize);
    // navigator.clipboard.writeText(screen);

    return ctx.getImageData(imgInfo.x, imgInfo.y, imgInfo.width, imgInfo.height);
};

// const ascii = (...arguments) => {
//     const { imageData, originalData, editedImageData, editedData, elapsedTime } = getArgs(arguments);

//     const availableCharacters = {
//         'low': ["█", "#", "=", ":", "-", " "],
//         'high': [ "█", "▓", "▒", "░", "#", "@", "±", "=", "+", ":", "-", "°", ".", " "],
//         'black and white': ["█", " "]
//     };

//     const characters = availableCharacters[arguments[3]] ?? arguments[3];
//     const fontSize = arguments[4];

//     for (let y = 0; y <= imageData.height; y += fontSize) {
//         for (let x = 0; x <= imageData.width; x += fontSize) {
//             let sumGray = 0;
//             let pixelCount = 0;
//             for(let dh = 0; dh < fontSize; dh++) {
//                 for(let dw = 0; dw < fontSize; dw++) {
//                     if (!isOutsideBounds(x + dw, y + dh, 0, imageData.width - 1, 0, imageData.height - 1)) {
//                         let index = 4 * ((x + dw) + (y + dh) * imageData.width);
//                         sumGray += originalData[index] * .2126 + originalData[index + 1] * .7152 + originalData[index + 2] * .0722;
//                         pixelCount++;
//                     }
//                 }
//             }

//             let avgGray = sumGray / pixelCount;

//             for(let dh = 0; dh < fontSize; dh++) {
//                 for(let dw = 0; dw < fontSize; dw++) {
//                     if (!isOutsideBounds(x + dw, y + dh, 0, imageData.width, 0, imageData.height)) {
//                         let index = 4 * ((x + dw) + (y + dh) * imageData.width);
//                         editedData[index + 0] = avgR;
//                         editedData[index + 1] = avgG;
//                         editedData[index + 2] = avgB;
//                     }
//                 }
//             }
//         }
//     }
//     return editedImageData;
// };