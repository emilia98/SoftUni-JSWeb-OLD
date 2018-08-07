import { AbstractControl, Validator, ValidationErrors } from '@angular/forms';

export class ModelValidator implements Validator {
    static shouldHaveGivenLength(c: AbstractControl): ValidationErrors | null {
        if (c.value.length >= 4) {
            return null
        }

        return { hasGivenLength: false }
    }

    validate() {
        return null;
    }
}