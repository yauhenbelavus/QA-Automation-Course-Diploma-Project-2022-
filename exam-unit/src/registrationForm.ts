import { emailInput, passwordRegularExpressions } from "../helper/constants";
import { upperCaseInput } from "../helper/constants";
import { passwordMinimalLength } from "../helper/constants";
import { Credentials } from "exam-unit/helper/types";

export class RegistrationForm {
     constructor() {}

get invalidUpperCaseInputMessage() {
    return "Please, keep in minde, all characters should be only UpperCase letters";
  }

get maximumNamesLengthMessage() {
    return "Your name has riched the maximum length";
  }

get invalidNamesLengthErrorMessage() {
    return "Name's length has exceeded maximum according to requirements";
}

get invalidEmailInputMessage() {
    return "Email doesn't contain such obligatory characters as '.' or '@'";
  }

get passwordNoNumberMessage() {
    return "Password must contain at least one number";
  }

get passwordNoSpecialCharacterMessage() {
    return "Password must conatain at least one special charachter";
  }

get passwordNoUpperCaseMessage() {
    return "Password must contain at least one upperCase charachter";
  }

get invalidPasswordLenghtMessage() {
    return `Password must be at least ${passwordMinimalLength} characters in length`;
  }

get invalidPasswordConfirmation() {
    return "Your password should be equal with above one";
  }

get disabledCreateButtonMessage() {
    return "No one field should be blank to create a user";
  }

public validateUserNameLength(inputValue: string, valueLength: number) { 
    if((inputValue.length - 1) < valueLength) {
            return true
    } else if ((inputValue.length - 1) === valueLength) {
            return inputValue.length - 1;
    } else {
            return false
    }
  }

public validateUpperCaseInput(inputValue: string) {
    if(inputValue.match(upperCaseInput)?.length === inputValue.length) {
            return true
    }
  }

public validateUserNameValue(inputValue: string, maxValueLength: number) {
    let result;
    if(this.validateUpperCaseInput(inputValue) === true) {
       result = this.validateUserNameLength(inputValue, maxValueLength) 
          if (result === true) {
                return true
           } else if(typeof result == 'number') {
                return this.maximumNamesLengthMessage;
           } else if(inputValue.length === 0) {
                return null;
           } else {
                throw new Error(this.invalidNamesLengthErrorMessage);
                 
           }
    } else {
          return this.invalidUpperCaseInputMessage; 
    }
  }

public validateEmailInput(inputValue: string) {
    let result = inputValue.match(emailInput)?.length === 2;
    if(result === true) {
      return result;
    } else if(inputValue.length === 0) {
      return null;
    } else {
      return this.invalidEmailInputMessage;
    }
  }

public validatePasswordLength(inputValue: string, inputValueLength: number) { 
    if(inputValue.length >= inputValueLength) {
            return true;
    } 
  }

public validatePasswordInput(inputValue: string) {
     if(this.validatePasswordLength(inputValue, passwordMinimalLength) === true) {
          if(passwordRegularExpressions.upperNumberSpecial.test(inputValue) === true) {
                 return true;
             }
          if(passwordRegularExpressions.upperSpecial.test(inputValue) === true) {
                 return this.passwordNoNumberMessage;
             }
          if(passwordRegularExpressions.upperNumber.test(inputValue) === true) {
                 return this.passwordNoSpecialCharacterMessage;
             }
          if(passwordRegularExpressions.numberSpecial.test(inputValue) === true) {
                 return this.passwordNoUpperCaseMessage;
             }
          if(passwordRegularExpressions.number.test(inputValue) === true) {
                 return this.passwordNoSpecialCharacterMessage && this.passwordNoUpperCaseMessage;
             }
          if(passwordRegularExpressions.special.test(inputValue) === true) {
                 return this.passwordNoNumberMessage && this.passwordNoUpperCaseMessage;
             }
          if(passwordRegularExpressions.upper.test(inputValue) === true) {
                 return this.passwordNoNumberMessage && this.passwordNoSpecialCharacterMessage;
             }
          if(inputValue.length === 0) {
                 return null;
             } 
        } else {
                 return this.invalidPasswordLenghtMessage;
        }
  }

public confirmPassword(inputValue: string, confirmPasswordInputValue: string) {
    if(this.validatePasswordInput(inputValue) === true && inputValue === confirmPasswordInputValue) {
           return true;
    } else if(confirmPasswordInputValue.length === 0) {
           return null;
    } else {
           return this.invalidPasswordConfirmation;
    }
  }  

public enableCreateButton(credentials: Credentials) {
    if(this.validateUserNameValue(credentials.firstUserNameValue, credentials.firstUsernameValueLength) && this.validateUserNameValue(credentials.secondUserNamevalue, credentials.secondUserNameValueLength) 
    &&  this.validateEmailInput(credentials.emailValue) && this.confirmPassword(credentials.passwordValue, credentials.confirmPasswordValue) === true) {
          return true
    } else if(this.validateUserNameValue(credentials.firstUserNameValue, credentials.firstUsernameValueLength) || this.validateUserNameValue(credentials.secondUserNamevalue, credentials.secondUserNameValueLength) 
    || this.validateEmailInput(credentials.emailValue) || this.validatePasswordInput(credentials.passwordValue) || this.confirmPassword(credentials.passwordValue, credentials.confirmPasswordValue) === null) {
          return this.disabledCreateButtonMessage;
    }
  }
}

export const registrationForm = new RegistrationForm();