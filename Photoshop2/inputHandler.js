import { file } from './constants.js';

const IMAGE_EXT = ['gif','jpg','jpeg','png', 'jfif'];
const VIDEO_EXT = ['mpg', 'mp2', 'mpeg', 'mpe', 'mpv', 'mp4'];

export const handleFileInput = () => {
    fileInput.addEventListener("change", () => {
        file.reset();

        const [name, extension] = fileInput.files[0].name.split(".");
        file.name = name;
        file.extension = extension;
    
        if (IMAGE_EXT.includes(extension)) {
            file.media = new Image();
            file.media.src = URL.createObjectURL(fileInput.files[0]);
            file.media.addEventListener('load', () => {
                file.loaded = true;
                file.isVideo = false;
                file.width = file.media.width;
                file.height = file.media.height;
                canvas.width = file.width;
                canvas.height = file.height;
                videoPlayer.hidden = true;
            })
        } else if (VIDEO_EXT.includes(extension)) {
            file.media = video;//document.createElement('video');
            file.media.src = URL.createObjectURL(fileInput.files[0]);
            file.media.addEventListener('loadeddata', () => {
                file.loaded = true;
                file.isVideo = true;
                file.width = file.media.videoWidth;
                file.height = file.media.videoHeight;
                file.media.currentTime = 0;
                canvas.width = file.width;
                canvas.height = file.height;
                videoPlayer.hidden = false;
            })
        } else {
            alert("There´s no media type for your file. Try another");
            file.reset();
        }
    });
}

// export { handleFileInput };