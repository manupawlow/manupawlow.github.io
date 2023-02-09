import { file, canvas, ctx } from "./constants.js";
import { effects } from './effectsHandler.js';

function screenshot(canvas, filename) {
    var link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL();
    link.click();
}

let frames = [];
let promises = [];
let startTime;
export function downloadVideo() {

    console.log('Downloading...');
    console.log(effects.filter(e => e.active));
    file.downloading = true;

    startTime = Date.now();

    const readFrame = async () => {
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(file.media, 0, 0);
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        let index = frames.length;
        frames.push(imageData);

        // let promise = new Promise((res, rej) => {
        //     for (const effect of effects.filter(e => e.active)) {
        //         var copy = ctx.createImageData(imageData.width, imageData.height);
        //         copy.data.set(imageData.data);
        //         frames[index] = effect.apply(frames[index], copy, 0);
        //     }
        // })
        // promises.push(promise);

        file.media.requestVideoFrameCallback(readFrame);
    }

    //Read frames
    file.media.addEventListener('play', () =>  {
        file.media.requestVideoFrameCallback(readFrame)
    });

    file.media.addEventListener('ended', async () => {
        //Apply effects
        console.log('reading frames wating time:', Date.now() - startTime);
        console.log('frames', frames.length, '- expectedVideoFrames', file.media.duration * 23.98);
        
        startTime = Date.now();
        let promises = [];
        const activeEffects = effects.filter(e => e.active);0
        for (let i = 0; i < frames.length; i++) {
            // promises.push(new Promise((res, rej) => {
                for (const effect of activeEffects) {
                    // var copy = ctx.createImageData(frames[i].width, frames[i].height);
                    // copy.data.set(frames[i].data);
                    frames[i] = effect.apply(frames[i], frames[i], 0);
                }
                console.log('frame');
            // })
            // );
        }
        // Promise.all(promises);

        console.log('applying effects waiting time:', Date.now() - startTime);
                
        let fps = frames.length / video.duration;
        let interval = 1000 / fps;
        console.log('fps', fps);

        const chunks = [];
        const stream = canvas.captureStream(fps);
        const recorder = new MediaRecorder(stream);

        recorder.ondataavailable = (e) => { chunks.push(e.data); };
        recorder.onstop = (e) => {
            let filename = "pepe.mp4";
            var blob = new Blob(chunks)
            var vidURL = URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.download = filename;
            link.href = vidURL;
            link.click();
        }
        
        startTime = Date.now();
        recorder.start();
        for (let frame of frames) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.putImageData(frame, 0, 0);
            await new Promise(r => setTimeout(r, interval))
        }
        
        recorder.stop();

        console.log('recording wating time:', Date.now() - startTime);

        file.downloading = false;
    });

    file.media.pause();
    file.media.playbackRate = .25;
    file.media.currentTime = 0;
    file.media.play();
}