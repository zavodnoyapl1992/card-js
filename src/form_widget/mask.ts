import {CallbackType} from "./types";

const callCallbacks = (value: string, callbacks?: CallbackType[]): void => {
    if (!callbacks) {
        return;
    }
    for (let callback of callbacks) {
        callback(value);
    }
}

const unmask = (value) => {
    return value.replace(new RegExp(/[^\d]/, 'g'), '')
}

export const dateMask = (selector: string, separator: string = '/', callbacks?: CallbackType[]) => {
    let oldValue;
    const input = document.querySelector(selector);
    const regex = new RegExp(/^(1|0|0[1-9]|1[012]){1}(\d{0,2})?$/g);

    const mask = (value) => {
        const output = [];
        for(let i = 0; i < value.length; i++) {
            if(i !== 0 && i % 2 === 0) {
                output.push(separator);
            }
            output.push(value[i]);
        }
        return output.join('');
    }

    const keydownHandler = (e) => {
        oldValue = e.target.value;
    }
    const inputHandler = (e) => {
        var el = e.target,
            newValue = el.value
        ;
        newValue = unmask(newValue);

        if(newValue.match(regex)) {
            newValue = mask(newValue);
            el.value = newValue;
        } else {
            el.value = oldValue;
        }
        callCallbacks(el.value, callbacks);
    }

    input.addEventListener('keydown', keydownHandler);
    input.addEventListener('input', inputHandler);
}

export const cvcMask = (selector: string, callbacks?: CallbackType[]) => {
    let oldValue;
    const input = document.querySelector(selector);
    const regex = new RegExp(/^\d{0,3}$/g);

    const keydownHandler = (e) => {
        oldValue = e.target.value;
    }
    const inputHandler = (e) => {
        var el = e.target,
            newValue = el.value
        ;
        newValue = unmask(newValue);

        if(newValue.match(regex)) {
            el.value = newValue;
        } else {
            el.value = oldValue;
        }
        callCallbacks(el.value, callbacks);
    }

    input.addEventListener('keydown', keydownHandler);
    input.addEventListener('input', inputHandler);
}

export const accountMask = (selector: string, callbacks?: CallbackType[]) => {
    let oldValue;
    const input = document.querySelector(selector);
    const regex = new RegExp(/^\d{0,18}$/g);

    const mask = (value) => {
        const output = [];
        for(let i = 0; i < value.length; i++) {
            if(i !== 0 && i % 4 === 0) {
                output.push(' ');
            }
            output.push(value[i]);
        }
        return output.join('');
    }

    const keydownHandler = (e) => {
        oldValue = e.target.value;
    }
    const inputHandler = (e) => {
        var el = e.target,
            newValue = el.value
        ;
        newValue = unmask(newValue);

        if(newValue.match(regex)) {
            newValue = mask(newValue);
            el.value = newValue;
        } else {
            el.value = oldValue;
        }
        callCallbacks(el.value, callbacks);
    }

    input.addEventListener('keydown', keydownHandler);
    input.addEventListener('input', inputHandler);
}


