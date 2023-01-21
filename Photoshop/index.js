const IMG_EXTENSION = ['gif','jpg','jpeg','png', 'jfif'];
const VID_EXTENSION = ['mpg', 'mp2', 'mpeg', 'mpe', 'mpv', 'mp4'];

let ctx;
let recorder;
let media, mediaMetadata;
let state;

function renderCallback() {
    if (mediaMetadata.loaded && !state.processing) renderMedia(state.effects, state.elapsedTime);
    setTimeout(renderCallback, 1000 / state.fps);
    if (!state.paused) state.elapsedTime += 1 / state.fps;
}

function setDefaultValues() {
    if(media) media.src = '';
    state = {
        fps: 20,
        paused: false,
        processing: false,
        elapsedTime: 0,
        effects: [],
    }    
    ctx = canvas.getContext("2d", { willReadFrequently: true });
    recorder = new Recorder(canvas);
    media = null;
    mediaMetadata = { loaded: false };
    frames = [];    
}

const resizeCanvas = () => {
    canvas.width = window.innerWidth - 140*2;
    canvas.height = window.innerHeight * .8;
}

function init() {

    resizeCanvas();
    
    window.addEventListener('resize', resizeCanvas);

    setDefaultValues();

    mediaInput.addEventListener("change", () => { 
        if(media) media.src = '';
        const [filename, extension] = mediaInput.files[0].name.split(".");
        mediaMetadata.name = filename;
        mediaMetadata.extension = extension;

        let isVideo = VID_EXTENSION.includes(extension);
        media = isVideo ? video : new Image();
        media.crossOrigin = "anonymous";
        media.src = URL.createObjectURL(mediaInput.files[0]);;
        let event = isVideo ? "loadeddata" : "load";
        media.addEventListener(event, () => {
            mediaMetadata.loaded = true;
            mediaMetadata.isVideo = isVideo;
            mediaMetadata.originalWidth = isVideo ? media.videoWidth : media.width;
            mediaMetadata.originalHeight = isVideo ? media.videoHeight : media.height;
            if (isVideo) media.currentTime = 0;
        })
        // alert("There´s no media type for your file. Try another");

        downloadVideoBtn.disabled = !isVideo;
    }, false);
    
    renderCallback();
}

window.onload = init;