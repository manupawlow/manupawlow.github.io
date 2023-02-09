export const isOutsideBounds = (x, y, left, rigth, top, down) => (x <= left || y <= top || y > down || x > rigth);

export const grayScale = (r, g, b) => r * .2126 + g * .7152 + b * .0722;

export function createTextInput(type, text) {
    const label = document.createElement(type);
    label.innerHTML = text;
    return label;
}
export function createLabel(text) {
    const label = document.createElement('label');
    label.innerHTML = text;
    return label;
}
export function createRangeInput(params, name, min, max, def, step = 1) {
    const range = document.createElement('input');
    range.type = 'range';
    range.min = min;
    range.max = max;
    range.step = step;
    range.value = def;
    params[name] = def;
    range.addEventListener('input', (e) => {
        params[name] = parseFloat(e.target.value);
    });
    return range;
}
export function createCheckboxInput(params, name, def) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = def;
    params[name] = def;
    checkbox.addEventListener('click', (e) => {
        params[name] = e.target.checked;
    });
    return checkbox;
}