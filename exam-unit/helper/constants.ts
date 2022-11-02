export const firstNameLengthLimit = 20;
export const secondNameLengthLimit = 20;
export const passwordMinimalLength = 10;
export const upperCaseValueLength = 19;
export const upperCaseValueInvalidLength = 21;
export const lowerCaseCharactersNumber = 1;
export const upperCaseInput = /[A-Z?\s]/g;
export const emailInput = /[@.]+/g;
export const invalidEmail = 'jAmaica78gmail.com'
export const invalidPassword = 'ja4maIcax'

export const passwordRegularExpressions = {
upperNumberSpecial: /(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/g,
upperNumber: /(?=.*[A-Z])(?=.*[0-9])/g,
upperSpecial: /(?=.*[A-Z])(?=.*[!@#$%^&*])/g,
numberSpecial: /(?=.*[0-9])(?=.*[!@#$%^&*])/g,
upper: /(?=.*[A-Z])/g,
number: /(?=.*[0-9])/g,
special: /(?=.*[!@#$%^&*])/g
}