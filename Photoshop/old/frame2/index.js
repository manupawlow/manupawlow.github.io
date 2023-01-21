const FPS = 60;
const INTERVAL_IN_MS = 1000 / FPS;
const INTERVAL_IN_SECONDS = 1 / FPS

const ctx = canvas.getContext("2d");
let seekResolve;

let start;

let frames = []
let callbackCount = 0;
const callback = async () => {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // ctx.drawImage(video, 0, 0);
    var ratio = Math.min(canvas.width / 1366, canvas.height / 550);
    var centerShift_x = (canvas.width - 1366 * ratio) / 2;
    var centerShift_y = (canvas.height - 550 * ratio) / 2;
    ctx.drawImage(video, 0, 0, 1366, 550, centerShift_x, centerShift_y, 1366 * ratio, 550 * ratio);
    
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    frames.push(imageData);
    video.requestVideoFrameCallback(callback);
}

video.addEventListener('play', () => {
    start = Date.now(); 
    video.requestVideoFrameCallback(callback);
});

video.addEventListener('ended', () => {

    console.log('original time', Date.now() - start);

    playBtn.disabled = false;

    callbackCount = 0;
    console.log('Finish');
});

playBtn.addEventListener('click', async () => {

    console.log('frames', frames.length);
    console.log('duration', video.duration);
    console.log('fps', frames.length / video.duration);
    let fps = frames.length / video.duration;

    console.log('processing...')
    for (let i = 0; i < frames.length; i++) {
        frames[i] = invert(frames[i], 0, {});
    }


    start = Date.now();
    console.log('showing...')
    for (let frame of frames) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.putImageData(frame, 0, 0);
        await new Promise(r => setTimeout(r, 1000 / fps))
    }
    console.log('edited time', Date.now() - start);

})

//       while (currentTime < duration) {
//         video.currentTime = currentTime;
//         await new Promise((r) => (seekResolve = r));
  
//         context.drawImage(video, 0, 0, w, h);
//         let base64ImageData = canvas.toDataURL();
//         frames.push(base64ImageData);
  
//         currentTime += interval;
//       }


// video.addEventListener('loadeddata', () => {
//     start = Date.now();
//     video.play();
//     timerCallback();
// });

// video.addEventListener('ended', () => {
//     console.log("Finish");
//     let elapsedTime = Date.now() - start;
//     console.log('elapsedTime', elapsedTime);
//     console.log('expected frames', FPS * elapsedTime / 1000);
// });

// let frames = [];
// let frameCount = 0;

// const timerCallback = () => {
    
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.drawImage(video, 0, 0);

// //       let interval = 1 / fps;
// //       let currentTime = 0;
  
// //       while (currentTime < duration) {
// //         video.currentTime = currentTime;
// //         await new Promise((r) => (seekResolve = r));
  
// //         context.drawImage(video, 0, 0, w, h);
// //         let base64ImageData = canvas.toDataURL();
// //         frames.push(base64ImageData);
  
// //         currentTime += interval;
// //       }

//     setTimeout(timerCallback, INTERVAL);
// }




// (async() => {
//     const log = document.querySelector("pre");
//     const vid = document.querySelector("video");
//     const canvas = document.querySelector("canvas");
//     const ctx = canvas.getContext("2d");

//     await vid.play();
//     canvas.width = vid.videoWidth;
//     canvas.height = vid.videoHeight;
//     ctx.filter = "invert(1)";
//     const drawingLoop = (timestamp, frame) => {
//         log.textContent = `timestamp: ${ timestamp } frame: ${ JSON.stringify( frame, null, 4 ) }`;
//         ctx.drawImage( vid, 0, 0 );
//         let pepe = 0;
//         for (let i = 0; i < 100000000; i++) {
//             pepe+=1;
//         }
//         vid.requestVideoFrameCallback( drawingLoop );  
//     };
//     vid.requestVideoFrameCallback( drawingLoop );

//     })();

// async function extractFramesFromVideo(videoUrl, fps = 25) {
//     return new Promise(async (resolve) => {
//       // fully download it first (no buffering):
//       let videoBlob = await fetch(videoUrl).then((r) => r.blob());
//       let videoObjectUrl = URL.createObjectURL(videoBlob);
//       let video = document.createElement("video");
  
//       let seekResolve;
//       video.addEventListener("seeked", async function () {
//         if (seekResolve) seekResolve();
//       });
  
//       video.src = videoObjectUrl;
  
//       // workaround chromium metadata bug (https://stackoverflow.com/q/38062864/993683)
//       while (
//         (video.duration === Infinity || isNaN(video.duration)) &&
//         video.readyState < 2
//       ) {
//         await new Promise((r) => setTimeout(r, 1000));
//         video.currentTime = 10000000 * Math.random();
//       }
//       let duration = video.duration;
  
//       let canvas = document.createElement("canvas");
//       let context = canvas.getContext("2d");
//       let [w, h] = [video.videoWidth, video.videoHeight];
//       canvas.width = w;
//       canvas.height = h;
  
//       let frames = [];
//       let interval = 1 / fps;
//       let currentTime = 0;
  
//       while (currentTime < duration) {
//         video.currentTime = currentTime;
//         await new Promise((r) => (seekResolve = r));
  
//         context.drawImage(video, 0, 0, w, h);
//         let base64ImageData = canvas.toDataURL();
//         frames.push(base64ImageData);
  
//         currentTime += interval;
//       }
//       resolve(frames);
//     });
//   }



//   let frames = await extractFramesFromVideo("https://upload.wikimedia.org/wikipedia/commons/2/22/Volcano_Lava_Sample.webm");