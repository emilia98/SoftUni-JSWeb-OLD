import { AbstractControl, Validator, ValidationErrors } from '@angular/forms';

export class PriceValidator implements Validator {
    static isValidPrice(c : AbstractControl) : ValidationErrors | null {
        let pattern = /^-?\d*\.?\d+$/;
        if(pattern.test(c.value) === false) {
            return { isValid : false};
        }
        
        let toNumber = (c.value) * 1.0;
        if(toNumber < 0) {
            return { isValid : false};
        }
        
        return null;
    }

    validate() {
        return null;
    }
}
