import {ValidatorType} from "./types";

const now = new Date();

export const validateMonth: ValidatorType =  (month: string): boolean => {
    if (month.length < 2) {
        return false;
    }
    try {
        const dateFormat = new Date(`2021-${parseInt(month)}-01`);
        if (month.length != dateFormat.getMonth().toString().length) {
            return month.length == ('0' + dateFormat.getMonth().toString()).length
        }
        return true;
    } catch (e) {
        return false;
    }
}

export const validationDateWithSeparator = (separator: string): ValidatorType => {
    return (date: string): boolean => {
        let [month, year] = date.split(separator);
        if (!month || !year) {
            return false;
        }
        if (!validateMonth(month)) {
            return false;
        }
        if (year.length == 2) {
            year = now.getFullYear().toString().substr(0, 2) + year;
        }
        try {
            const dateFormat = new Date(`${year}-${month}-01`);
            if (dateFormat.getFullYear() == now.getFullYear()) {
                return dateFormat.getMonth() > now.getMonth();
            }
            const yearDiff = dateFormat.getFullYear() - now.getFullYear();

            return yearDiff > 0 && yearDiff < 10;
        } catch (e) {
            return false;
        }
    }
}


export const validateCvc = (cvc: string): boolean => {
    const regexp = new RegExp(/^(\d{3})$/);

    return regexp.test(cvc);
}


export const validateAccount: ValidatorType = (account: string): boolean => {
    account = account.split(' ').join('');
    const regexp = new RegExp(/^(\d{16,18})$/);
    if (!regexp.test(account)) {
        return false
    }
    const length = account.length;
    let checkSum = 0;
    const accountArr = account.split('');

    for (let i = length - 1; i >= 0; i -= 2) {
        checkSum += parseInt(accountArr[i]);
    }

    for (let i = length - 2; i >= 0; i -= 2) {
        checkSum += (parseInt(accountArr[i]) * 2)
            .toString()
            .split('')
            .reduce((acc, curr) => acc + parseInt(curr), 0)
        ;
    }

    return !(0 === checkSum || 0 !== checkSum % 10);
}


export const isValid = (val: string, validators: ValidatorType[]): boolean => {
    let isValid = true;
    validators = validators || [];
    for (const validator of validators) {
        isValid = validator(val) && isValid;
    }

    return isValid;
}
