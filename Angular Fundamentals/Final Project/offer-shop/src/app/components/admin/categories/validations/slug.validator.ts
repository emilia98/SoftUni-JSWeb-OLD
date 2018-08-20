import {
    AbstractControl, 
    ValidationErrors,
    Validator
} from '@angular/forms';

export class CategorySlugValidator implements Validator {
    static isValidSlugLength(c :AbstractControl) : ValidationErrors | null {
        if(c.value.length > 0 && c.value.length <= 50) {
            return null;
        }
        return { invalidLength: true };
    }

    static isValidFormat(c :AbstractControl) : ValidationErrors | null {
        let pattern = /^([A-Za-z0-9_]+)$/g;

        if(pattern.test(c.value)) {
            return null;
        }

        return { invalidFormat: true }
    }

    validate() {
        return null;
    }
}