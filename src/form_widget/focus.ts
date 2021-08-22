import {ValidatorType} from "./types";
import {isValid} from "./validators";


export const onBlur = (selector: string, validators: ValidatorType[], errorClass: string = 'has_error') => {
    const elem: HTMLInputElement = document.querySelector(selector);
    const handler = (e) => {
        if (!isValid(elem.value, validators)) {
            elem.classList.add(errorClass);
        } else {
            elem.classList.remove(errorClass);
        }
    }
    elem.addEventListener('blur', handler);
}
