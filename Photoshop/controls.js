function play() {
    state.paused = false;
    if (mediaMetadata.isVideo) media.play();
    playBtn.disabled = true;
    pauseBtn.disabled = false;
}
function pause() {
    state.paused = true;
    if (mediaMetadata.isVideo) media.pause();
    pauseBtn.disabled = true;
    playBtn.disabled = false;
}
function reset() {
    state.elapsedTime = 0;
    state.effects.length = 0;
    effectsControl.innerHTML = '';
    if (mediaMetadata.isVideo) {
        pause();
        video.currentTime = 0;
    }
}
function undo() {
}

const getFilename = (validExtensions) => {
    let filename = mediaMetadata.name;
    for (const effect of state.effects) filename += "-" + effect.name;
    // filename += "." + (IMG_EXTENSION.includes(mediaMetadata.extension) ? mediaMetadata.extension : "png");
    filename += "." + (validExtensions.includes(mediaMetadata.extension) ? mediaMetadata.extension : validExtensions[0]);
    return filename;
}
function screenshot() {
    recorder.screenshot(getFilename(IMG_EXTENSION));
}

function startRecording() {
    recorder.startRecording(state.fps);
    startRecordBtn.disabled = true;
    stopRecordBtn.disabled = false;
}

function stopRecording() {
    recorder.stopRecording(getFilename(VID_EXTENSION));
    startRecordBtn.disabled = false;
    stopRecordBtn.disabled = true;
}

function fullScreen() {
    canvas.requestFullscreen()
}

const downloadVideo = () => {
    let loadInterval = 100;
    let videoFps = 30;
    let totalFrames = media.duration * videoFps;
    let frameCout = 0;
    let intervalId = setInterval(() => {
        frameCout += loadInterval / 1000 * videoFps;
        loadingBar.style.width = Math.min(100, (frameCout / totalFrames) * 100) + "%";
    }, loadInterval);

    state.processing = true;
    canvas.hidden = true;

    recorder.downloadVideo(() => {
        console.log('Im a callback');
        clearInterval(intervalId);
        loadingBar.hidden = true;
        canvas.hidden = false;
        state.processing = false;
        media.pause();
        media.currentTime = 0;
    })
}

playBtn.addEventListener('click', play);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);

screenshotBtn.addEventListener('click', screenshot);
startRecordBtn.addEventListener('click', startRecording);
stopRecordBtn.addEventListener('click', stopRecording);

fullScreenBtn.addEventListener('click', fullScreen);
downloadVideoBtn.addEventListener('click', downloadVideo);