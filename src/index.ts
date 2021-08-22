import {InitType, Field, ValidatorType} from "./form_widget/types";
import {isValid, validateAccount, validateCvc, validationDateWithSeparator} from "./form_widget/validators";
import {onBlur} from "./form_widget/focus";
import {accountMask, cvcMask, dateMask} from "./form_widget/mask";

export const initRaw = (config: InitType) => {
    if (!config.callbacks) {
        config.callbacks = {};
    }
    if (!config.validators) {
        config.validators = {};
    }
    const submitElement = document.querySelector(config.submitSelector);
    submitElement.setAttribute('disabled', 'disabled');
    for (const type of config.order) {
        const callbacks = config.callbacks[type] || [];
        const validators = config.validators[type] ?? [];
        callbacks.push((value) => {
            if (isValid(value, validators)) {
                for (const typeN of config.order) {
                    if (type == typeN || !config.selectors[typeN]) {
                        continue
                    }
                    const elem: HTMLInputElement = document.querySelector(config.selectors[typeN]);
                    if (!isValid(elem.value, (config.validators[typeN] ?? []))) {
                        elem.focus();
                        return;
                    }
                }
                const input: HTMLInputElement = document.querySelector(config.selectors[type]);
                input.blur();
                submitElement.removeAttribute('disabled');
            } else {
                submitElement.setAttribute('disabled', 'disabled');
            }
        })

        config.callbacks[type] = callbacks;
    }

    for (const type in config.selectors) {
        const selector = config.selectors[type];
        onBlur(selector, (config.validators[type] ?? []), config.errorSelector)
        switch (type) {
            case Field.ACCOUNT:
                accountMask(selector, config.callbacks[type] ?? []);
                break;
            case Field.DATE:
                dateMask(selector, config.dateSeparator ?? '/', config.callbacks[type] ?? []);
                break;
            case Field.CVC:
                cvcMask(selector, config.callbacks[type] ?? []);
                break;
        }
    }
}


export const init = (config: InitType) => {
    if (!config.validators) {
        config.validators = {};
    }
    const accountValidators = config.validators[Field.ACCOUNT] ?? [];
    accountValidators.push(validateAccount);
    config.validators[Field.ACCOUNT] = accountValidators;

    const cvcValidators = config.validators[Field.CVC] ?? [];
    cvcValidators.push(validateCvc);
    config.validators[Field.CVC] = cvcValidators;

    const dateValidators = config.validators[Field.DATE] ?? [];
    dateValidators.push(validationDateWithSeparator(config.dateSeparator || '/'));
    config.validators[Field.DATE] = dateValidators;

    initRaw(config);
}

