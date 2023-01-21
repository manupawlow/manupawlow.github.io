const EFFECTS = [
    ascii,
    factor,
    gray,
    invert,
    pixel,
    saturation,
    sepia,
    sin,
    convolution,
    colorFilter,
];

EFFECTS.forEach(effect => {
    let input = document.createElement('input');
    input.type = 'button';
    input.value = effect.displayName;
    input.addEventListener('click', () => {
        addEffect(effect);
    });
    effectsBtn.appendChild(input);
    
    // var script = document.createElement("script");
    // script.src = "./effects/" + effect.name + ".js";
    // document.body.appendChild(script);
});

const addEffect = (effect) => {
    
    // let effect = EFFECTS.filter(e => e.name == effect)[0];

    let effectInstance = {
        name: effect.name,
        apply: effect.apply,
        args: { },
    }
    
    const effectDiv = document.createElement('div');
    effectDiv.id = effect.name;
    // div.classList.add('effect-panel');
    effectsControl.appendChild(effectDiv);
    
    const h4 = document.createElement('h4');
    h4.innerHTML = effect.displayName;

    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = "X";
    removeBtn.addEventListener('click', () =>  {
        state.effects = state.effects.filter(x => x !== effectInstance);
        effectDiv.remove();
    });

    effectDiv.appendChild(h4);
    effectDiv.appendChild(removeBtn);

    for (const arg of effect.args) {

        const p = document.createElement('span');
        p.innerHTML = arg.name;

        const el = document.createElement('input');
        el.type = arg.type;
        el.value = arg.default;
        el.min = arg.min;
        el.max = arg.max;

        el.addEventListener("input", () => effectInstance.args[arg.name] = parseInt(el.value));

        effectInstance.args[arg.name] = arg.default;

        effectDiv.appendChild(p);
        effectDiv.appendChild(el);
    }

    state.effects.push(effectInstance);
}