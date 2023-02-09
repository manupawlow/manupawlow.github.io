let canvas, ctx;
let screenCanvas, screenCtx;
let file;


function setCanvas(obj) {
    canvas = obj;
    ctx = canvas.getContext('2d', { willReadFrequently: true });
}

function setScreenCanvas(obj) {
    screenCanvas = obj;
    screenCtx = screenCanvas.getContext('2d', { willReadFrequently: true });
}

function setFile(obj) {
    file = obj;
}

export { 
    file, canvas, ctx, screenCanvas, screenCtx,
    setFile, setCanvas, setScreenCanvas,
};