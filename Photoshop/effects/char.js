const map = (OldValue, OldMin, OldMax, NewMin, NewMax) => {
    let NewValue;
    let OldRange = (OldMax - OldMin)
    if (OldRange == 0)
        NewValue = NewMin
    else
    {
        NewRange = (NewMax - NewMin)  
        NewValue = (((OldValue - OldMin) * NewRange) / OldRange) + NewMin
    }
    return NewValue;
}

const alphabetSet = {
    'a': [
        " ***  ",
        "    * ",
        " **** ",
        "*   * ",
        " **** ",
        "      ",
    ],
    'b': [
        "*     ",
        "*     ",
        "****  ",
        "*   * ",
        "****  ",
        "      ",
    ],
    'c': [
        " **** ",
        "*     ",
        "*     ",
        "*     ",
        " **** ",
        "      ",
    ],
    '#': [
        " * *  ",
        "***** ",
        " * *  ",
        "***** ",
        " * *  ",
        "      ",
    ],
    ' ': [
        "      ",
        "      ",
        "      ",
        "      ",
        "      ",
        "      ",
    ],
    '=': [
        "      ",
        "***** ",
        "      ",
        "***** ",
        "      ",
        "      ",
    ],
    ':': [
        "      ",
        "  *   ",
        "      ",
        "  *   ",
        "      ",
        "      ",
    ],
    '+': [
        "      ",
        "  *   ",
        " ***  ",
        "  *   ",
        "      ",
        "      ",
    ],
    '-': [
        "      ",
        "      ",
        " ***  ",
        "      ",
        "      ",
        "      ",
    ],
    '.': [
        "      ",
        "      ",
        "  *   ",
        "      ",
        "      ",
        "      ",
    ]
}

//#=:+-. 

const writeChar = (imageData, c, x0, y0, size) => {

    const data = imageData.data;

    let char = alphabetSet[c];
    let charSize = char.length;

    size *= charSize;

    for (let y = y0; y < y0 + size; y++) {
        for (let x = x0; x < x0 + size; x++) {
            
            let _x = parseInt( map(x, x0, x0 + size, 0, charSize) );
            let _y = parseInt( map(y, y0, y0 + size, 0, charSize) );

            let i = 4 * (x + y * imageData.width);
            if (char[_y][_x] == "*") {
                data[i] = 255; // red
                data[i + 1] = 255; // green
                data[i + 2] = 255; // blue
                data[i + 3] = 255;
            } 
            else {
                data[i] = 0; // red
                data[i + 1] = 0; // green
                data[i + 2] = 0; // blue
                data[i + 3] = 255; // blue
            }
        }
    }
    // ctx.putImageData(imageData, x0, y0);
    
    return imageData;

    // for (let y = 0; y < imageData.height; y++) {
    //     for (let x = 0; x < imageData.width; x++) {
            
    //         let _x = parseInt( map(x, 0, imageData.width, 0, charSize) );
    //         let _y = parseInt( map(y, 0, imageData.height, 0, charSize) );

    //         let i = 4 * (x + y * imageData.width);
    //         if (char[_y][_x] == "*") {
    //             data[i] = 255; // red
    //             data[i + 1] = 255; // green
    //             data[i + 2] = 255; // blue
    //         } else {
    //             data[i] = 0; // red
    //             data[i + 1] = 0; // green
    //             data[i + 2] = 0; // blue
    //         }
    //     }
    // }
};