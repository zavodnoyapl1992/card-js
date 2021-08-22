import {validateMonth, validationDateWithSeparator, validateCvc, validateAccount} from './validators'

test('checkMonth', () => {
    expect(validateMonth('aa')).toBe(false)
    expect(validateMonth('1')).toBe(false)
    expect(validateMonth('13')).toBe(false)
    expect(validateMonth('-1')).toBe(false)
    expect(validateMonth('02')).toBe(true)
    expect(validateMonth('12')).toBe(true)
})

test('checkDate', () => {
    const lastMonth = new Date()
    lastMonth.setMonth(lastMonth.getMonth() - 1)
    expect(validationDateWithSeparator('/')(lastMonth.getMonth().toString() + '/' + lastMonth.getFullYear().toString())).toBe(false)
    expect(validationDateWithSeparator('/')('10/99')).toBe(false)
    expect(validationDateWithSeparator('/')('10/1999')).toBe(false)
    expect(validationDateWithSeparator('/')('10/2020')).toBe(false)
    const valid = new Date();
    valid.setUTCFullYear(lastMonth.getFullYear() + 5);
    expect(validationDateWithSeparator('/')('10/' + valid.getFullYear().toString())).toBe(true)
    expect(validationDateWithSeparator('/')('10/' + valid.getFullYear().toString().substr(2, 2))).toBe(true)
})


test('checkCvc', () => {
    expect(validateCvc('123')).toBe(true)
    expect(validateCvc('012')).toBe(true)
    expect(validateCvc('a12')).toBe(false)
    expect(validateCvc('11a')).toBe(false)
    expect(validateCvc('11')).toBe(false)
    expect(validateCvc('1111')).toBe(false)
})


test('validateAccount', () => {
    expect(validateAccount('4200000000000001')).toBe(false)
    expect(validateAccount('4200000000000000')).toBe(true)
    expect(validateAccount('42S0000000000000')).toBe(false)
    expect(validateAccount('600000000000000007')).toBe(true)
    expect(validateAccount('611111111111111113')).toBe(true)
    expect(validateAccount('711111111111111113')).toBe(false)
    expect(validateAccount('7')).toBe(false)
})
