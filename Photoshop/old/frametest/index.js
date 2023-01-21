const frames = [];
const button = document.querySelector("button");
const select = document.querySelector("select");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

button.onclick = async(evt) => {
  if (HTMLVideoElement.prototype.requestVideoFrameCallback) {
    let stopped = false;
    const video = await getVideoElement();
    
    let start = Date.now();
    const drawingLoop = async(timestamp, frame) => {
    
      const bitmap = await createImageBitmap(video);
      
      frames.push(bitmap);
      
      // await new Promise(r => setTimeout(r, 1000));
      // console.log(frames.length)

      if (frames.length % 60 == 0) {
        console.log((Date.now() - start) / 1000)
      }

      video.requestVideoFrameCallback(drawingLoop);
    };
    
    video.onended = (evt) => alert('finish');

    video.requestVideoFrameCallback(drawingLoop);
  } else {
    console.error("your browser doesn't support this API yet");
  }
};

select.onchange = (evt) => {
  const frame = frames[select.value];
  // canvas.width = frame.width;
  // canvas.height = frame.height;
  ctx.drawImage(frame, 0, 0);

  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
  imageData = invert(imageData, 0, {});
  
  ctx.putImageData(imageData, 0, 0);

};

const show = async (fps) => {

  const stream = canvas.captureStream(0);

  const recorder = new MediaRecorder(stream);

  let chunks = [];

  video2.src = stream;

  recorder.start()

  for (let i = 0; i < frames.length *.25; i++) {
    ctx.drawImage(frames[i], 0, 0);

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
    imageData = invert(imageData, 0, {});
    
    ctx.putImageData(imageData, 0, 0);

    stream.requestFrame();

    await new Promise(r => setTimeout(r, 1000 / fps));
  }

  recorder.stopRecording("test.mp4");
}

const download = () => {
  console.log(frames);
  var blob = new Blob(frames)
  var vidURL = URL.createObjectURL(blob);
  var link = document.createElement('a');
  link.download = "frames.mp4";
  link.href = vidURL;
  link.click();
}

async function getVideoElement() {
  // const video = document.createElement("video");
  // video.crossOrigin = "anonymous";
  // video.src = "https://upload.wikimedia.org/wikipedia/commons/a/a4/BBH_gravitational_lensing_of_gw150914.webm";
  // document.body.append(video);
  await video.play();
  console.log(video.videoWidth, video.videoHeight)
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  return video;
}