import {
    Validator,
    ValidationErrors,
    AbstractControl
} from '@angular/forms';

export class UsernameValidator implements Validator {
    static shouldContainOnlyAllowedChars(c :AbstractControl) : ValidationErrors | null {
        if(/^\w+$/g.test(c.value)) {
            return null;
        }

        return { containsForbiddenChars: true};
    }

    static shouldHaveExactLength(c :AbstractControl) :ValidationErrors | null {
        if(c.value.length >= 3 && c.value.length <= 20) {
            return null;
        }

        return { hasUnproperLength: true }
    }

    validate() {
        return null;
    }
}