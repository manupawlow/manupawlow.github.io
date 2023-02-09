import { default as pixel } from "./effects/pixel.js";
import { default as edges } from "./effects/edges.js";
import { default as negative } from "./effects/negative.js";
import { default as factor } from "./effects/factor.js";
import { default as sinWaves } from "./effects/sinwave.js";

export const effects = [
    pixel,
    edges,
    negative,
    factor,
    sinWaves,
];


export function handleEffects(btnsEl, panelEl) {

    for (const effect of effects) {
        let input = document.createElement('input');
        input.type = 'button';
        input.value = effect.name;
        input.addEventListener('click', () => {
            effect.active = !effect.active;
            if (effect.active) {
                panelEl.appendChild(effect.el);
            } else {
                panelEl.removeChild(effect.el);
            }
        });
        btnsEl.appendChild(input);
    }
}