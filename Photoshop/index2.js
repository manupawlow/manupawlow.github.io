const FRAME_RATE = 60;
const DELTA_TIME = 1000 / FRAME_RATE;

let elapsedTime = 0;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

let media, mediaData = {};
let paused = true;

const mediaInput = document.getElementById('mediaInput');
mediaInput.addEventListener("change", () => { 

    const url = URL.createObjectURL(mediaInput.files[0]);
    const extension = mediaInput.files[0].name.split(".")[1]

    if (['gif','jpg','jpeg','png', 'jfif'].includes(extension)) {
        media = new Image();
        media.crossOrigin = "anonymous";
        media.src = url;
        media.addEventListener("load", () => {
            mediaData.isVideo = false;
            mediaData.originalWidth = media.width;
            mediaData.originalHeight = media.height;

            timerCallback();
        })

        return;
    }
    
    if (['mpg', 'mp2', 'mpeg', 'mpe', 'mpv', 'mp4'].includes(extension)) {
        media = document.getElementById('video');
        media.src = url;
        // media.addEventListener("play", timerCallback);
        media.addEventListener('loadeddata', () => {
            mediaData.isVideo = true;
            mediaData.originalWidth = media.videoWidth;
            mediaData.originalHeight = media.videoHeight;

            play();
            timerCallback();
         }, false);

         return;
    }

    alert("There´s no media type for your file. Try another");

}, false);

const renderMedia = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var ratio = Math.min(canvas.width / mediaData.originalWidth, canvas.height / mediaData.originalHeight);
    var centerShift_x = (canvas.width - mediaData.originalWidth * ratio) / 2;
    var centerShift_y = (canvas.height - mediaData.originalHeight * ratio) / 2;
    ctx.drawImage(media, 0, 0, mediaData.originalWidth, mediaData.originalHeight, centerShift_x, centerShift_y, mediaData.originalWidth * ratio, mediaData.originalHeight * ratio);
    
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i]; // red
        data[i + 1] = 255 - data[i + 1]; // green
        data[i + 2] = 255 - data[i + 2]; // blue
    }
    ctx.putImageData(imageData, 0, 0);

    mediaData.x = centerShift_x;
    mediaData.y = centerShift_y;
    mediaData.width = mediaData.originalWidth * ratio;
    mediaData.height = mediaData.originalHeight * ratio;
}

const timerCallback = () => {
    renderMedia();
    setTimeout(timerCallback, DELTA_TIME);
    if (!paused) elapsedTime += DELTA_TIME / 1000;
}

function play() {
    paused = false;
    if (mediaData.isVideo) media.play();
    document.getElementById('play-btn').disabled = true;
    document.getElementById('pause-btn').disabled = false;
}
function pause() {
    paused = true;
    if (mediaData.isVideo) media.pause();
    document.getElementById('pause-btn').disabled = true;
    document.getElementById('play-btn').disabled = false;
}