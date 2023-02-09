import { effects, handleEffects } from './effectsHandler.js';
import { handleFileInput } from './inputHandler.js'
import { file, canvas, ctx, screenCanvas, screenCtx, setFile, setCanvas, setScreenCanvas, } from './constants.js'
import { downloadVideo } from './recorder.js'

const FPS = 30;
const INTERVAL = 1000 / FPS;
let elapsedTime = 0;

// const file = {
//     reset: () => Object.keys(file).filter(k => k != 'reset').forEach(key => delete file[key]),
// };

// let canvas, ctx;
// let screenCanvas, screenCtx;

const run = async () => {
    
    setCanvas(document.getElementById('canvas'));
    setScreenCanvas(document.getElementById('screenCanvas'));
    setFile({
        reset: () => Object.keys(file).filter(k => k != 'reset').forEach(key => delete file[key]),
    });

    //INIT
    handleFileInput();
    handleEffects(document.getElementById('effects-btns'), document.getElementById('effects-panel'));
    
    downloadBtn.addEventListener('click', downloadVideo);

    screenCanvas.width = window.innerWidth * .95;
    screenCanvas.height = window.innerHeight * .8;
    window.addEventListener('resize', () => {
        screenCanvas.width = window.innerWidth * .95;
        screenCanvas.height = window.innerHeight * .8;
    });

    playPauseBtn.addEventListener('click', () => {
        if (file.media.paused) {
            file.media.play();
        } else {
            file.media.pause();
        }
    });

    while(true) {

        //UPDATE

        //RENDER
        // if (file.loaded && !file.downloading) {
        //     //Render original
        //     ctx.clearRect(0, 0, canvas.width, canvas.height);
        //     ctx.drawImage(file.media, 0, 0);
        //     let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            
        //     //Applying effects
        //     for (const effect of effects.filter(e => e.active)) {
        //         var copy = ctx.createImageData(imageData.width, imageData.height);
        //         copy.data.set(imageData.data);
        //         imageData = effect.apply(imageData, copy, elapsedTime);
        //     }
        //     //Render with effects
        //     ctx.putImageData(imageData, 0, 0);

        //     //Show resized canvas in screen
        //     screenCtx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);
        //     let ratio = Math.min(screenCanvas.width / file.width, screenCanvas.height / file.height);
        //     let w = file.width * ratio;
        //     let h = file.height * ratio;
        //     let centerShift_x = (screenCanvas.width - w) / 2;
        //     let centerShift_y = (screenCanvas.height - h) / 2;
        //     screenCtx.drawImage(canvas, 0, 0, file.width, file.height, centerShift_x, centerShift_y, w, h);
        // }
        await new Promise(r => setTimeout(r, INTERVAL));
        elapsedTime += INTERVAL;
    }
}

run();




// const getFPS = async (vid, obj) => { 

//     // Part 1
//     let last_media_time, last_frame_num, fps, fps_rounder = [], frame_not_seeked = true;
    
//     // Part 2 (with some modifications):
//     function ticker(useless, metadata) {
//         console.log("aaa");
//         let media_time_diff = Math.abs(metadata.mediaTime - last_media_time);
//         let frame_num_diff = Math.abs(metadata.presentedFrames - last_frame_num);
//         let diff = media_time_diff / frame_num_diff;
//         if (diff && diff < 1 && frame_not_seeked && fps_rounder.length < 50 && vid.playbackRate === 1) {
//             fps_rounder.push(diff);
//             fps = Math.round(1 / get_fps_average());
//             let certainty = fps_rounder.length * 2;
//             document.querySelector("p").textContent = "FPS: " + fps + ", certainty: " + fps_rounder.length * 2 + "%";
//             if (certainty > 99) {
//                 vid.pause();
//                 vid.currentTime = 0;
//                 document.querySelector("p").textContent = "FPS: " + fps + ", certainty: " + fps_rounder.length * 2 + "% DONEE" ;
//                 obj.fps = fps;
//             }
//         }
//         frame_not_seeked = true;
//         last_media_time = metadata.mediaTime;
//         last_frame_num = metadata.presentedFrames;
//         vid.requestVideoFrameCallback(ticker);
//     }
//     vid.requestVideoFrameCallback(ticker);

//     // Part 3:
//     vid.addEventListener("seeked", function () {
//         console.log("bbb")
//         fps_rounder.pop();
//         frame_not_seeked = false;
//     });

//     // Part 4:
//     const get_fps_average = () => fps_rounder.reduce((a, b) => a + b) / fps_rounder.length;

//     vid.play();
// }