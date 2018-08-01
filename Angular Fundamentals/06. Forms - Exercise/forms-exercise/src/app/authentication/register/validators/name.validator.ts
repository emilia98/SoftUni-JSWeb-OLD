import { AbstractControl, Validator, ValidationErrors } from '@angular/forms';

export class NameValidator implements Validator {
    static shouldStartWithCapital(c :AbstractControl) : ValidationErrors | null {
        if(/^[A-Z]/g.test(c.value)) {
            return null;
        }
        return { startsWithCapital : false };
    }

    static containsOnlyLetters(c :AbstractControl) : ValidationErrors | null {
        if(/^[A-Za-z]+$/g.test(c.value)) {
            return null;
        }

        return { containsOnlyLetters : false} ;
    }

    validate() {
        return null;
    }
}