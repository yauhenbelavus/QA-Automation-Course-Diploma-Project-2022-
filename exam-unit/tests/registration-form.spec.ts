import { firstNameLengthLimit, invalidEmail, invalidPassword, lowerCaseCharactersNumber, passwordMinimalLength, upperCaseValueInvalidLength, upperCaseValueLength } from "../helper/constants";
import { secondNameLengthLimit } from "../helper/constants";
import { expect } from "chai";
import { Credentials } from "../helper/types";
import { registrationForm } from "../src/registrationForm";
import { generateUpperCaseValue, generateValueOneLowerCaseCharacter } from "../helper/valuesGenerator";

const validCredentials: Credentials = {
    firstUserNameValue: generateUpperCaseValue(upperCaseValueLength), 
    firstUsernameValueLength: firstNameLengthLimit,
    secondUserNamevalue: generateUpperCaseValue(upperCaseValueLength),
    secondUserNameValueLength: secondNameLengthLimit,
    emailValue: 'jAmaica78@gmail.com',
    passwordValue: 'ja4maIca!x',
    confirmPasswordValue: 'ja4maIca!x'
}

const invalidCredentials: Credentials = {
    firstUserNameValue: generateUpperCaseValue(upperCaseValueInvalidLength), 
    firstUsernameValueLength: firstNameLengthLimit,
    secondUserNamevalue: generateUpperCaseValue(upperCaseValueInvalidLength),
    secondUserNameValueLength: secondNameLengthLimit,
    emailValue: 'jAmaica78@gmailcom',
    passwordValue: 'ja4maIcax9',
    confirmPasswordValue: 'ja4maIca!y'
}

const invalidRegisterCredentials: Credentials = {
    firstUserNameValue: generateUpperCaseValue(upperCaseValueLength), 
    firstUsernameValueLength: firstNameLengthLimit,
    secondUserNamevalue: generateUpperCaseValue(upperCaseValueLength),
    secondUserNameValueLength: secondNameLengthLimit,
    emailValue: '',
    passwordValue: 'ja4maIca!x',
    confirmPasswordValue: 'ja4maIca!x'
}

describe('Registration Form Testing', () => {
    describe('Positive testing', () => {
        it('Should accept "FirstUserName" value in upperCase', () => {
            expect(registrationForm.validateUpperCaseInput(validCredentials.firstUserNameValue)).to.be.true;
        });
       
        it(`Should accept "FirstUserName" value in upperCase at lenght in ${upperCaseValueLength} characters`, () => {
            expect(registrationForm.validateUserNameValue(generateUpperCaseValue(upperCaseValueLength), firstNameLengthLimit)).to.be.true;
        });

        it(`Should accept "FirstUserName" value in upperCase at max valid lenght in ${firstNameLengthLimit} characters and display message: ${registrationForm.maximumNamesLengthMessage}`, () => {
            expect(registrationForm.validateUserNameValue(generateUpperCaseValue(firstNameLengthLimit), firstNameLengthLimit)).to.equal(registrationForm.maximumNamesLengthMessage);
        });
    
        it('Should accept "SecondUserName" value in upperCase', () => {
            expect(registrationForm.validateUpperCaseInput(validCredentials.secondUserNamevalue)).to.be.true;
        });
    
        it(`Should accept "SecondUserName" value in upperCase at max valid lenght in ${secondNameLengthLimit} characters and display message: ${registrationForm.maximumNamesLengthMessage}`, () => {
            expect(registrationForm.validateUserNameValue(generateUpperCaseValue(firstNameLengthLimit), firstNameLengthLimit)).to.equal(registrationForm.maximumNamesLengthMessage);
        });
    
        it('Should accept "E-mail" value in upperCase, number, "@" and "." characters', () => {
            expect(registrationForm.validateEmailInput(validCredentials.emailValue)).to.be.true
        });

        it('Should accept "Password" value with at least one special charachter, upperCase and number' , () => {
            expect(registrationForm.validatePasswordInput(validCredentials.passwordValue)).to.be.true
        });

        it(`Should accept "Password" value with length: ${passwordMinimalLength}`, () => {
            expect(registrationForm.validatePasswordLength(validCredentials.passwordValue, passwordMinimalLength)).to.be.true;
        });

        it('Should accept the same value in "Confirm Password" field as in "Password" field', () => {
            expect(registrationForm.confirmPassword(validCredentials.passwordValue, validCredentials.confirmPasswordValue)).to.be.true;
        });

        it('Should enabled "Create" button if each field is filled with valid value', () => {
            expect(registrationForm.enableCreateButton(validCredentials)).to.be.true;
        });
    });
   
    describe('Negative testing', () => {
        it(`Should return error message: ${registrationForm.invalidNamesLengthErrorMessage} if "FirstUserName" value in Uppercase and is ${upperCaseValueInvalidLength} characters lentgh`, () => {
            expect(() => registrationForm.validateUserNameValue(invalidCredentials.firstUserNameValue, firstNameLengthLimit)).to.throw(registrationForm.invalidNamesLengthErrorMessage);
        });

        it(`Should return error message: ${registrationForm.invalidUpperCaseInputMessage} if at least ${lowerCaseCharactersNumber} "FirstUserName" characters in not in Uppercase`, () => {
            expect(registrationForm.validateUserNameValue(generateValueOneLowerCaseCharacter(upperCaseValueLength, lowerCaseCharactersNumber), firstNameLengthLimit)).to.equal(registrationForm.invalidUpperCaseInputMessage);
        });
    
        it(`Should return error message: ${registrationForm.invalidEmailInputMessage} if "E-mail" value doesn't contain "." symbol`, () => {
            expect(registrationForm.validateEmailInput(invalidCredentials.emailValue)).to.equal(registrationForm.invalidEmailInputMessage);
        });

        it(`Should return error message: ${registrationForm.invalidEmailInputMessage} if "E-mail" value doesn't contain "@" symbol`, () => {
            expect(registrationForm.validateEmailInput(invalidEmail)).to.equal(registrationForm.invalidEmailInputMessage);
        });

        it(`Should return error message: ${registrationForm.passwordNoSpecialCharacterMessage} if "Password" value doesn't contain any special character`, () => {
            expect(registrationForm.validatePasswordInput(invalidCredentials.passwordValue)).to.equal(registrationForm.passwordNoSpecialCharacterMessage);
        });

        it(`Should return error message: ${registrationForm.invalidPasswordLenghtMessage} if "Password" value less than ${passwordMinimalLength}`, () => {
            expect(registrationForm.validatePasswordInput(invalidPassword)).to.equal(registrationForm.invalidPasswordLenghtMessage);
        });

        it(`Should return error message: ${registrationForm.invalidPasswordConfirmation} if "Confirm Password" and "Password" values are not the same`, () => {
            expect(registrationForm.confirmPassword(validCredentials.passwordValue, invalidCredentials.confirmPasswordValue)).to.equal(registrationForm.invalidPasswordConfirmation);
        });

        it(`Should return error message: ${registrationForm.disabledCreateButtonMessage} if email value is absent`, () => {
            expect(registrationForm.enableCreateButton(invalidRegisterCredentials)).to.equal(registrationForm.disabledCreateButtonMessage);
        });
    });
})