const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
const FRAME_RATE = 60;
const FRAME_TIME = 1000 / FRAME_RATE;
let elapsedTime = 0, deltaTime = 1, prevDelta = 0;


const imgInfo = { };
let originalImageData;
let currEffect;
let loaded = false, paused = false;

let effects = [];

const img = new Image();
img.crossOrigin = "anonymous";
img.src = "./images/spiderman2.jpg";

const fileUrl = document.getElementById('fileUrl');


const drawImage = () => {
  var ratio = Math.min(canvas.width/img.width, canvas.height/img.height);
  var centerShift_x = (canvas.width - img.width*ratio) / 2;
  var centerShift_y = (canvas.height - img.height*ratio) / 2;  
  ctx.clearRect(0,0,canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width*ratio, img.height*ratio);
  
    imgInfo.x = centerShift_x;
    imgInfo.y = centerShift_y;
    imgInfo.width = img.width * ratio;
    imgInfo.height = img.height * ratio;
    originalImageData = ctx.getImageData(imgInfo.x, imgInfo.y, imgInfo.width, imgInfo.height);
    
    loaded = true;
  }
  
  fileUrl.addEventListener("change", () => { img.src = URL.createObjectURL(fileUrl.files[0]); loaded = false }, false);
  img.addEventListener("load", drawImage);
  
  const applyEffect = (...arguments) => {
    let values = [];
  for(let i=1; i < arguments.length; i++) { 
    let val = prompt("Enter " + arguments[i]);
    if (!val) return;
    values.push(isNaN(val) ? val : parseFloat(val));
  }
  effects.push({
    effect: arguments[0],
    args: values ?? [],
  })
}

function copyImageData(ctx, src)
{
    var dst = ctx.createImageData(src.width, src.height);
    dst.data.set(src.data);
    return dst;
}

const animation = async () => {
  while(true) {
    if (loaded) {
      
      // ctx.clearRect(0,0,canvas.width, canvas.height);

      let imageData = copyImageData(ctx, originalImageData); //ctx.getImageData(imgInfo.x, imgInfo.y, imgInfo.width, imgInfo.height);
      
      for (const effect of effects) {
        imageData = effect.effect(imageData, copyImageData(ctx, imageData), elapsedTime, ...effect.args)
      }
      
      ctx.putImageData(imageData, imgInfo.x, imgInfo.y);
    }
    
    await new Promise(r => setTimeout(r, FRAME_TIME));
    
    elapsedTime += deltaTime;
  }
}

const reset = () => { 
  let wantToReset = confirm('Are you sure you want to reset?');
  if (!wantToReset) return;

  effects = [];
  ctx.clearRect(0,0,canvas.width, canvas.height);
}
const pause = () => {
  if (deltaTime == 0) {
    deltaTime = prevDelta;
    document.getElementById('pause-btn').value = 'Play';
  } else {
    prevDelta = deltaTime;
    deltaTime = 0;
    document.getElementById('pause-btn').value = 'Stop';
  }
}
const speedDown = () => deltaTime = Math.max(0.1, deltaTime - 0.1);
const speedUp = () => deltaTime += 0.1;

animation()





//TESTING
function pick(event) {
  const bounding = canvas.getBoundingClientRect();
  const x = event.clientX - bounding.left;
  const y = event.clientY - bounding.top;
  const pixel = ctx.getImageData(x, y, 1, 1);
  const data = pixel.data;

  const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3]})`;

  alert(rgba);
}
canvas.addEventListener("click", (event) => pick(event));