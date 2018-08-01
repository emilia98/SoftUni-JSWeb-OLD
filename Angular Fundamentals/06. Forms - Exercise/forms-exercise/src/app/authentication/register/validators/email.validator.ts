import { AbstractControl, Validator, ValidationErrors } from '@angular/forms';

export class EmailValidator implements Validator {
    static isEmailValidated(c :AbstractControl) : ValidationErrors | null {
        let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(pattern.test(c.value)) {
            return null;
        }
        
        return { emailValidated : false};
    }

    validate() {
        return null;
    }
}
