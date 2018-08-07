import { AbstractControl, Validator, ValidationErrors } from '@angular/forms';


export class PasswordValidator implements Validator {
    static hasOnlyAlphanumerics(c :AbstractControl) : ValidationErrors | null {
        if(/^[A-Za-z0-9]+$/g.test(c.value)) {
            return null;
       }
       return { hasOnlyAlphanumerics : false };
    }

    static hasCustomLength(c :AbstractControl) : ValidationErrors | null {
        if(c.value.length < 4 || c.value.length > 16) {
            return { wrongLength : true}
        }

        return null;
    }

    validate() {
        return null;
    }
}