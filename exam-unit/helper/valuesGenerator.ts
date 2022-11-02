const upperCaseCharacters = 'ABCDEFGHIJKL MNOPQRSTUVWXYZ';

export function generateUpperCaseValue(length: number) {
    let result = ' ';
    const charactersLength = upperCaseCharacters.length;
    for (let i = 0; i < length; i++) {
        result += upperCaseCharacters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

const lowerCaseCharacters = 'abcdefghijk lmnopqrstuvwxyz';

export function generateLowerCaseValue(length: number) {
    let result = ' ';
    const charactersLength = lowerCaseCharacters.length;
    for (let i = 0; i < length; i++) {
        result += lowerCaseCharacters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

export function generateValueOneLowerCaseCharacter(upperCaselength: number, lowercaseLength: number) {
    let result = generateUpperCaseValue(upperCaselength).concat(generateLowerCaseValue(lowercaseLength));
    return result;
}