import {
    Validator,
    ValidationErrors,
    AbstractControl
} from '@angular/forms';

export class PasswordValidator implements Validator {
    static shouldContainsAllowedChars(c :AbstractControl) : ValidationErrors | null {
        if(/^[A-Za-z0-9_\@\#\$\&\-\*]+$/g.test(c.value)) {
            return null;
        }

        return { containsForbiddenChars: true};
    }
    
    static shouldHaveExactLength(c :AbstractControl) :ValidationErrors | null {
        if(c.value.length >= 4 && c.value.length <= 20) {
            return null;
        }

        return { hasUnproperLength: true }
    }

    validate() {
        return null;
    }
}