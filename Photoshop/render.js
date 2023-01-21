const getResizedProportions = (w, h, maxW, maxH) => {
    let ratio = Math.min(maxW/w, maxH/h);
    let newW = w * ratio;
    let newH = h * ratio;
    let centerShift_x = (maxW - newW) / 2;
    let centerShift_y = (maxH - newH) / 2;
    return { x: centerShift_x, y: centerShift_y, w: newW, h: newH, }
}

const renderOriginalMedia = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const { x,y,w,h } = getResizedProportions(mediaMetadata.originalWidth, mediaMetadata.originalHeight, canvas.width, canvas.height);
    ctx.drawImage(media, 0, 0, mediaMetadata.originalWidth, mediaMetadata.originalHeight, x, y, w, h);
  
    mediaMetadata.x = x;
    mediaMetadata.y = y;
    mediaMetadata.width = w;
    mediaMetadata.height = h;

    return ctx.getImageData(mediaMetadata.x, mediaMetadata.y, mediaMetadata.width, mediaMetadata.height);
}

const renderMedia = (effects, elapsedTime) => {
    let imageData = renderOriginalMedia();
    // let imageData = ctx.getImageData(mediaMetadata.x, mediaMetadata.y, mediaMetadata.width, mediaMetadata.height);
    for (const effect of effects) {
        imageData = effect.apply(imageData, elapsedTime, effect.args);
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(imageData, mediaMetadata.x, mediaMetadata.y);
    
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // var ratio = Math.min(canvas.width / mediaMetadata.originalWidth, canvas.height / mediaMetadata.originalHeight);
    // var centerShift_x = (canvas.width - mediaMetadata.originalWidth * ratio) / 2;
    // var centerShift_y = (canvas.height - mediaMetadata.originalHeight * ratio) / 2;
    // ctx.drawImage(media, 0, 0, mediaMetadata.originalWidth, mediaMetadata.originalHeight, centerShift_x, centerShift_y, mediaMetadata.originalWidth * ratio, mediaMetadata.originalHeight * ratio);

    // mediaMetadata.x = centerShift_x;
    // mediaMetadata.y = centerShift_y;
    // mediaMetadata.width = mediaMetadata.originalWidth * ratio;
    // mediaMetadata.height = mediaMetadata.originalHeight * ratio;

    // let imageData = ctx.getImageData(mediaMetadata.x, mediaMetadata.y, mediaMetadata.width, mediaMetadata.height);
    // for (const effect of effects) {
    //     imageData = effect.apply(imageData, elapsedTime, effect.args);
    // }
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.putImageData(imageData, mediaMetadata.x, mediaMetadata.y);
}
