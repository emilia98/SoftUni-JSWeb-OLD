import {
    AbstractControl, 
    ValidationErrors,
    Validator
} from '@angular/forms';

export class LocationNameValidator implements Validator {
    static isValidNameLength(c :AbstractControl) : ValidationErrors | null {
        if(c.value.length > 0 && c.value.length <= 100) {
            return null;
        }
        return { invalidLength: true };
    }

    static isValidFormat(c :AbstractControl) : ValidationErrors | null {
        let pattern = /^([А-Я][а-яА-Я ]*)$/g;

        if(pattern.test(c.value)) {
            return null;
        }

        return { invalidFormat: true }
    }

    validate() {
        return null;
    }
}