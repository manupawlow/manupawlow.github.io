const CHARACTERS_QUALITY = [
    "# ",
    "#+- ",
    "#=:+-. ",
    "@#?!=:+-. ",
    "@#$?!=;:+-. ",
    "@#W$9876543210?!;:+=-,. ",
    "Ñ@#W$9876543210?!abc;:+=-,. ",
    "█ ",
    "█▓▓▒▒░░ ",
];

const adjustCharacters = (characters, brightness) => {

    const brightRepeat = brightness >= 20 ? brightness - 20 : 0;
    const darkRepeat = brightness < 20 ? 20 - brightness : 0;

    let newCharacters = "";
    let halfLenght = characters.length / 2;
    for (let i = 0; i < characters.length; i++) {
        if (i < halfLenght){
            let percent = 1 - i / halfLenght;
            newCharacters += characters[i] + characters[i].repeat(darkRepeat * percent);
        } else {
            let percent = (i - halfLenght) / halfLenght;
            newCharacters += characters[i] + characters[i].repeat(brightRepeat * percent);
        }
    }
    return newCharacters;
}

function apply(imageData, elapsedTime, params) {
    const readData = imageData.data;
    const writeImageData = copyImageData(imageData);
    const writeData = writeImageData.data;

    const fontSize = params.fontSize * 2;
    const halfFontSize = fontSize / 2;
    
    let characters = adjustCharacters(CHARACTERS_QUALITY[params.levelOfDetail], params.brightness);
    const isTextColorWhite = params.textColor == 1;
    const isTextColor = params.textColor == 2;

    const textColor = params.textColor;
    const bgWhite = textColor % 2 == 0;
    const bg = textColor % 2 == 0 ? 'black' : 'white';
    const char = textColor >= 2 ? '' : textColor == 0 ? 'white' : 'black';
    // 0 - bg black, char white
    // 1 - bg white, char black
    // 2 - bg black, char color
    // 3 - bg white, char color

    characters = characters.split("").reverse().join("");

    let screen = [], i=0;
    for (let y = 0; y < imageData.height; y += fontSize) {
        screen.push([]);
        for (let x = 0; x < imageData.width; x += halfFontSize) {
            let index = 4 * (x + y * imageData.width);
            let r = readData[index];
            let g = readData[index + 1];
            let b = readData[index + 2];
            let a = readData[index + 3];

            let gray = a == 0 ? 255 : r * .2126 + g * .7152 + b * .0722;

            let charIndex = parseInt(gray * (characters.length-1) / 255);
            let color = `rgb(${r},${g},${b})`;
            screen[i].push( { char: characters[charIndex], color });
        }
        i++;
    }

    // ctx.clearRect(0,0,canvas.width, canvas.height);
   
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = bg;
    ctx.fill();
    ctx.fillStyle = char;
    ctx.font = fontSize + "px Courier New";
    for (i = 0; i < screen.length; i++) {
        for (let j = 0; j < screen[i].length; j++) {
            if (!char) ctx.fillStyle = screen[i][j].color;
            ctx.fillText(screen[i][j].char, mediaMetadata.x + j * halfFontSize, mediaMetadata.y + i * fontSize + fontSize);
        }
    }

    return ctx.getImageData(mediaMetadata.x, mediaMetadata.y, mediaMetadata.width, mediaMetadata.height);;
};

const ascii = { 
    name: 'ascii', 
    displayName: 'ASCII', 
    apply,
    args: [
        { name: 'fontSize', default: 7, min: 2, max: 20, type: 'range' },
        { name: 'levelOfDetail', default: 2, min: 0, max: CHARACTERS_QUALITY.length - 1, type: 'range' },
        { name: 'brightness', default: 30, min: 0, max: 60, type: 'range' },
        { name: 'textColor', default: 1, min: 0, max: 3, type: 'range' },
    ], 
};