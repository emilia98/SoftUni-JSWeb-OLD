import {
    AbstractControl,
    ValidationErrors,
    Validator
} from '@angular/forms';

export class PostCodeValidator implements Validator {
    static isValidPostCode(c: AbstractControl): ValidationErrors | null {
        let pattern = /^\d{4}$/g;

        if (pattern.test(c.value)) {
            let toNumber = parseInt(c.value);

            if (toNumber >= 1000 && toNumber <= 9999) {
                return null;
            }

            return { invalidCode: true };
        }

        return { invalidCode: true };
    }

    validate() {
        return null;
    }
}