import { AbstractControl, Validator, ValidationErrors } from '@angular/forms';

export class DescriptionValidator implements Validator {
    static shouldHaveGivenLength(c: AbstractControl): ValidationErrors | null {
        if (c.value.length >= 10) {
            return null
        }

        return { hasGivenLength: false }
    }

    validate() {
        return null;
    }
}