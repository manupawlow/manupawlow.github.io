class Recorder {
    constructor(canvas) {
        this.canvas = canvas;
        this.chunks = [];
        this.frames = [];
        this.promises = [];
        this.startTime = 0;
        this.stream = null;
    }

    screenshot(filename) {
        var link = document.createElement('a');
        link.download = filename;
        link.href = this.canvas.toDataURL()
        link.click();
    }

    startRecording(fps) {
        this.stream = this.canvas.captureStream(fps);
        this.recorder = new MediaRecorder(this.stream);
        this.recorder.start();
        this.recorder.ondataavailable = (e) => {
            this.chunks.push(e.data);
        };
    }

    stopRecording(filename) {
        this.recorder.onstop = (e) => {
            var blob = new Blob(this.chunks)
            var vidURL = URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.download = filename;
            link.href = vidURL;
            link.click();
        }
            
        this.recorder.stop();

        this.reset();
    }

    downloadVideo(callback) {

        this.startTime = Date.now();

        const readFrame = async () => {
            let imageData = renderOriginalMedia();
            this.frames.push(imageData);
            this.promises.push(async () => {
                for (const effect of state.effects) {
                    imageData = effect.apply(imageData, state.elapsedTime, effect.args);
                }
            });

            media.requestVideoFrameCallback(readFrame);
        }

        //Read frames
        media.addEventListener('play', () =>  {
            video.requestVideoFrameCallback(readFrame)
        });

        media.addEventListener('ended', async () => {
            //Apply effects
            console.log('reading frames wating time:', Date.now() - this.startTime);
            this.startTime = Date.now();

            Promise.all(this.promises);
            console.log('frames', this.frames.length, 'videoFrames', media.duration * 23.98);
            console.log('effects waiting time:', Date.now() - this.startTime);
            this.startTime = Date.now();

            // let start = Date.now();
            // for (let i = 0; i < frames.length; i++) {
            //     // if (i % 100 == 0) console.log("Effects applied on", i, "frames")
            //     for (const effect of state.effects) {
            //         frames[i] = effect.apply(frames[i], state.elapsedTime, effect.args);
            //     }
            // }
            // console.log('effects waiting time:', Date.now() - start);
    
            // let fps = this.frames.length / video.duration;
            // let interval = 1000 / fps;
            // state.fps /= 20;
            let fps = this.frames.length / video.duration;
            let interval = 1000 / fps;
            console.log('fps', fps);

            this.startRecording(fps);
            
            //Render
            for (let frame of this.frames) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.putImageData(frame, mediaMetadata.x, mediaMetadata.y);
                // this.stream.getVideoTracks()[0].requestFrame();
                await new Promise(r => setTimeout(r, interval))
            }
            
            this.stopRecording(getFilename(VID_EXTENSION));

            console.log('recording wating time:', Date.now() - this.startTime);
            
            this.reset();

            callback();
        });
    
        media.pause();
        media.playbackRate = 1;
        media.currentTime = 0;
        media.play();
    }

    reset() {
        this.chunks = [];
        this.frames = [];
    }
}
// class Recorder {
//     constructor(canvas) {
//         this.canvas = canvas;
//         this.chunks = [];
//         this.frames = [];
//     }

//     screenshot(filename) {
//         var link = document.createElement('a');
//         link.download = filename;
//         link.href = this.canvas.toDataURL()
//         link.click();
//     }

//     startRecording(fps) {
//         let cStream = this.canvas.captureStream(fps);
//         this.recorder = new MediaRecorder(cStream);
//         this.recorder.start();
//         this.recorder.ondataavailable = (e) => {
//             this.chunks.push(e.data);
//         };
//     }

//     pauseRecording() { paused = true; } 

//     resumeRecording() { paused = false; }

//     stopRecording(filename) {
//         this.recorder.onstop = (e) => {
//             var blob = new Blob(this.chunks)
//             var vidURL = URL.createObjectURL(blob);
//             var link = document.createElement('a');
//             link.download = filename;
//             link.href = vidURL;
//             link.click();
//         }
            
//         this.recorder.stop();

//         this.reset();
//     }

//     downloadVideo(callback) {

//         const readFrame = async () => {
//             let imageData = renderOriginalMedia();
//             frames.push(imageData);
//             media.requestVideoFrameCallback(readFrame);
//         }

//         //Read frames
//         media.addEventListener('play', () =>  {
//             video.requestVideoFrameCallback(readFrame)
//         });

//         media.addEventListener('ended', async () => {
//             //Apply effects
//             let start = Date.now();
//             for (let i = 0; i < frames.length; i++) {
//                 for (const effect of state.effects) {
//                     frames[i] = effect.apply(frames[i], state.elapsedTime, effect.args);
//                 }
//             }
//             console.log('apply effects time', Date.now() - start);
    
//             let fps = frames.length / video.duration;
//             let interval = 1000 / fps;
    
//             this.startRecording(fps);
            
//             //Render
//             for (let frame of frames) {
//                 ctx.clearRect(0, 0, canvas.width, canvas.height);
//                 ctx.putImageData(frame, mediaMetadata.x, mediaMetadata.y);
//                 await new Promise(r => setTimeout(r, interval))
//             }
            
//             this.stopRecording(getFilename(VID_EXTENSION));
            
//             this.reset();

//             callback();

//             console.log('Finish ended');
//         });
    
//         media.pause();
//         media.playbackRate = .25;
//         media.currentTime = 0;
//         media.play();
//     }

//     reset() {
//         this.chunks = [];
//         this.frames = [];
//     }
// }