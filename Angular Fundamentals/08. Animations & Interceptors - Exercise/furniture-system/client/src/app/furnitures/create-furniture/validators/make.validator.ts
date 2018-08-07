import { AbstractControl, Validator, ValidationErrors } from '@angular/forms';

export class MakeValidator implements Validator {
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