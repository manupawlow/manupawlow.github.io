const effectArgs = {
    'colorAscii': [
        { name: 'fontSize', default: 14, min: 4, max: 30, type: 'range' },
        { name: 'levelOfDetail', default: 2, min: 0, max: 6, type: 'range' },
        { name: 'darkness', default: 5, min: 0, max: 20, type: 'range' },
    ],
    'colorAscii2': [
        { name: 'fontSize', default: 14, min: 4, max: 30, type: 'range' },
        { name: 'levelOfDetail', default: 2, min: 0, max: 6, type: 'range' },
        { name: 'darkness', default: 5, min: 0, max: 20, type: 'range' },
    ],
}

const isOutsideBounds = (x, y, left, rigth, top, down) => (x <= left || y <= top || y > down || x > rigth);

function copyImageData(src)
{
    var dst = ctx.createImageData(src.width, src.height);
    dst.data.set(src.data);
    return dst;
}


function templateEffect(imageData, elapsedTime, params) {
    const readData = imageData.data;
    const writeImageData = copyImageData(imageData);
    const writeData = writeImageData.data;

    for (let y = 0; y < imageData.height; y++) {
        for (let x = 0; x < imageData.width; x++) {
            let i = 4 * (x + y * imageData.width);
            let r = readData[i];
            let g = readData[i + 1];
            let b = readData[i + 2];

            writeData[i + 0] = r;
            writeData[i + 1] = g;
            writeData[i + 2] = b;
        }
    }

    return writeImageData;
}

//EFFECTS
// function colorAscii(imageData, elapsedTime, params) {
//     const readData = imageData.data;
//     const writeImageData = copyImageData(imageData);
//     const writeData = writeImageData.data;

//     const availableCharacters = {
//         0: "# ",
//         1: "#+- ",
//         2: "#=:+-. ",
//         3: "@#$?!=;:+-. ",
//         4: "Ñ@#W$9876543210?!abc;:+=-,. ",
//         5: "█ ",
//         6: "█▓▓▒▒░░ ",
//     };

//     const fontSize = params.fontSize % 2 == 0 ? params.fontSize : params.fontSize - 1;
//     const halfFontSize = fontSize / 2;
//     const darkness = params.darkness * 2;
//     const characters = availableCharacters[params.levelOfDetail] + ' '.repeat(darkness);

//     let screen = [], i=0;
//     for (let y = 0; y < imageData.height; y += fontSize) {
//         screen.push([]);
//         for (let x = 0; x < imageData.width; x += halfFontSize) {
//             let index = 4 * (x + y * imageData.width);
//             let r = readData[index];
//             let g = readData[index + 1];
//             let b = readData[index + 2];
//             let a = readData[index + 3];

//             let gray = a == 0 ? 255 : r * .2126 + g * .7152 + b * .0722;

//             let charIndex = parseInt(gray * (characters.length-1) / 255);
//             screen[i].push(`rgb(${r},${g},${b})`/*characters[charIndex]*/);
//         }
//         i++;
//     }

//     // ctx.clearRect(0,0,canvas.width, canvas.height);
   
//     let word = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ullam earum, error doloribus aspernatur ipsum consequatur doloremque, modi possimus aut architecto quae cumque voluptatum officiis laudantium consectetur? Dolorum, possimus saepe.";

//     ctx.rect(0, 0, canvas.width, canvas.height);
//     ctx.fillStyle = 'black';
//     ctx.fill();
//     ctx.font = fontSize + "px Courier New";
//     for (i = 0; i < screen.length; i++) {
//         for (let j = 0; j < screen[i].length; j++) {
//             let charIndex = (j + i * screen[i].length) % word.length;
//             ctx.fillStyle = screen[i][j];
//             ctx.fillText(word[charIndex], mediaMetadata.x + j * halfFontSize, mediaMetadata.y + i * fontSize + fontSize);
//         }
//     }

//     return ctx.getImageData(mediaMetadata.x, mediaMetadata.y, mediaMetadata.width, mediaMetadata.height);;
// }

// function colorAscii2(imageData, elapsedTime, params) {
//     const readData = imageData.data;
//     const writeImageData = copyImageData(imageData);
//     const writeData = writeImageData.data;

//     const availableCharacters = {
//         0: "# ",
//         1: "#+- ",
//         2: "#=:+-. ",
//         3: "@#$?!=;:+-. ",
//         4: "Ñ@#W$9876543210?!abc;:+=-,. ",
//         5: "█ ",
//         6: "█▓▓▒▒░░ ",
//     };

//     const fontSize = params.fontSize % 2 == 0 ? params.fontSize : params.fontSize - 1;
//     const halfFontSize = fontSize / 2;
//     const darkness = params.darkness * 2;
//     const characters = availableCharacters[params.levelOfDetail] + ' '.repeat(darkness);

//     let screen = [], i=0;
//     for (let y = 0; y < imageData.height; y += fontSize) {
//         screen.push([]);
//         for (let x = 0; x < imageData.width; x += halfFontSize) {
//             let index = 4 * (x + y * imageData.width);
//             let r = readData[index];
//             let g = readData[index + 1];
//             let b = readData[index + 2];
//             let a = readData[index + 3];

//             let gray = a == 0 ? 255 : r * .2126 + g * .7152 + b * .0722;

//             let charIndex = parseInt(gray * (characters.length-1) / 255);
//             screen[i].push( { style: `rgb(${r},${g},${b})`, char: characters[charIndex] });
//         }
//         i++;
//     }

//     // ctx.clearRect(0,0,canvas.width, canvas.height);
   
//     ctx.rect(0, 0, canvas.width, canvas.height);
//     ctx.fillStyle = 'black';
//     ctx.fill();
//     ctx.font = fontSize + "px Courier New";
//     for (i = 0; i < screen.length; i++) {
//         for (let j = 0; j < screen[i].length; j++) {
//             ctx.fillStyle = screen[i][j].style;
//             ctx.fillText(screen[i][j].char, mediaMetadata.x + j * halfFontSize, mediaMetadata.y + i * fontSize + fontSize);
//         }
//     }

//     return ctx.getImageData(mediaMetadata.x, mediaMetadata.y, mediaMetadata.width, mediaMetadata.height);;
// }