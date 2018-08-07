import { AbstractControl, Validator, ValidationErrors } from '@angular/forms';

export class YearValidator implements Validator {
    static isValidYear(c : AbstractControl) : ValidationErrors | null {
        if(c.value === null || c.value.length === 0) {
            return { isValid : false};
        }

        let pattern = /^-?\d*$/;
        if(pattern.test(c.value) === false) {
            return { isValid : false};
        }
        
        let toNumber = parseInt(c.value);
        if(toNumber < 1950 || toNumber > 2050) {
            return { isValid : false};
        }
        
        return null;
    }

    validate() {
        return null;
    }
}