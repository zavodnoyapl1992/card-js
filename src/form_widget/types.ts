export type CallbackType = (value: string) => void;
export type ValidatorType = (value: string) => boolean;
export const enum Field {
    DATE = 'date',
    ACCOUNT = 'account',
    CVC = 'cvc',
}

export type InitType = {
    selectors: {
        [key in Field]: string
    },
    submitSelector: string,
    dateSeparator?: string,
    errorSelector?: string,
    order: Field[],
    callbacks?: {
        [key in Field]: CallbackType[]
    } | {}
    validators?: {
        [key in Field]: ValidatorType[]
    } | {}
}
