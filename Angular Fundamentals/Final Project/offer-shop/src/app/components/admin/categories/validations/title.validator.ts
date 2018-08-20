import {
    AbstractControl, 
    ValidationErrors,
    Validator
} from '@angular/forms';

export class CategoryTitleValidator implements Validator {
    static isValidTitleLength(c :AbstractControl) : ValidationErrors | null {
        if(c.value.length > 0 && c.value.length <= 50) {
            return null;
        }
        return { invalidLength: true };
    }

    static isValidFormat(c :AbstractControl) : ValidationErrors | null {
        let pattern = /^([А-Яа-яA-Za-z0-9%-()\.,\\\/$]+)$/g;

        if(pattern.test(c.value)) {
            return null;
        }

        return { invalidFormat: true }
    }

    validate() {
        return null;
    }
}