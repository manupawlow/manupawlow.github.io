function copyImageData(src)
{
    var dst = ctx.createImageData(src.width, src.height);
    dst.data.set(src.data);
    return dst;
}

const isOutsideBounds = (x, y, left, rigth, top, down) => (x <= left || y <= top || y > down || x > rigth);

const getGrayScale = (r, g, b) => r * .2126 + g * .7152 + b * .0722;
