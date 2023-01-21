function apply(imageData, elapsedTime, params) {
    const readData = imageData.data;
    const writeImageData = copyImageData(imageData);
    const writeData = writeImageData.data;

    const radious = params.radious == 1 || params.radious % 2 == 0 ? params.radious : params.radious - 1;
    const halfRadious = parseInt(radious / 2);

    for (let y = 0; y < imageData.height + radious; y += radious) {
        for (let x = 0; x < imageData.width + radious; x += radious) {
            let sumR = 0;
            let sumG = 0;
            let sumB = 0;
            let pixelCount = 0;
            for(let dh = -halfRadious; dh < halfRadious; dh++) {
                for(let dw = -halfRadious; dw < halfRadious; dw++) {
                    if (!isOutsideBounds(x + dw, y + dh, 0, imageData.width - 1, 0, imageData.height - 1)) {
                        let index = 4 * ((x + dw) + (y + dh) * imageData.width);
                        sumR += readData[index + 0];
                        sumG += readData[index + 1];
                        sumB += readData[index + 2];
                        pixelCount++;
                    }
                }
            }

            let avgR = sumR / pixelCount;
            let avgG = sumG / pixelCount;
            let avgB = sumB / pixelCount;

            for(let dh = -halfRadious; dh < halfRadious; dh++) {
                for(let dw = -halfRadious; dw < halfRadious; dw++) {
                    if (!isOutsideBounds(x + dw, y + dh, 0, imageData.width, 0, imageData.height)) {
                        let index = 4 * ((x + dw) + (y + dh) * imageData.width);
                        writeData[index + 0] = avgR;
                        writeData[index + 1] = avgG;
                        writeData[index + 2] = avgB;
                    }
                }
            }
        }
    }

    return writeImageData;
};

const pixel = { 
    name: 'pixel', 
    displayName: 'Pixel', 
    apply, 
    args: [
        { name: 'radious', default: 20, min: 1, max: 50, type: 'range' }
    ], 
};