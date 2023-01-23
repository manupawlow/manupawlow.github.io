const word = "abc# =:+-.";

function apply(imageData, elapsedTime, params) {
    const readData = imageData.data;
    const writeImageData = copyImageData(imageData);
    const writeData = writeImageData.data;

    const fontSize = params.fontSize;
    const charIndex = params.charIndex;
    
    let characters = adjustCharacters(CHARACTERS_QUALITY[2], 20);
    let char = alphabetSet['a'];
    let charSize = char.length;

    // writeChar(writeImageData, word[charIndex], params.x, params.y, fontSize);
    // writeChar(writeImageData, word[charIndex + 1], params.x + fontSize * charSize, params.y, fontSize);

    // for (let i = 0; i < word.length; i++) {
    //     writeChar(writeImageData, word[i], 20 * i, 20, fontSize);
    // }

    for (let y = 0; y < imageData.height; y += fontSize * charSize) {
        for (let x = 0; x < imageData.width; x += fontSize * charSize) {
            let index = 4 * (x + y * imageData.width);
            let r = readData[index];
            let g = readData[index + 1];
            let b = readData[index + 2];
            let a = readData[index + 3];

            let gray = a == 0 ? 255 : r * .2126 + g * .7152 + b * .0722;

            let charIndex = parseInt(gray * (characters.length-1) / 255);
            let color = `rgb(${r},${g},${b})`;
            // screen[i].push( { char: characters[charIndex], color });
            writeChar(writeImageData, characters[charIndex], x, y, fontSize)
        }
    }

    return writeImageData;
};

const ascii2 = { 
    name: 'ascii2', 
    displayName: 'ASCII2', 
    apply,
    args: [
        { name: 'fontSize', default: 7, min: 2, max: 50, type: 'range' },
        { name: 'charIndex', default: 0, min: 0, max: word.length - 1, type: 'range' },
        { name: 'x', default: 0, min: 0, max: canvas.width, type: 'range' },
        { name: 'y', default: 0, min: 0, max: canvas.heigth, type: 'range' },
    ], 
};