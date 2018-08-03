import { AbstractControl, Validator, ValidationErrors} from '@angular/forms';


export class AgeValidator implements Validator {
    static isValidAge(c : AbstractControl) : ValidationErrors | null {
        if(c.value === null || c.value.length === 0) {
            return null;
        }

        let pattern = /^-?\d*$/;
        if(pattern.test(c.value) === false) {
            return { isValid : false};
        }
        
        let toNumber = parseInt(c.value);
        if(toNumber < 0 || toNumber > 150) {
            return { isValid : false};
        }
        
        return null;
    }

    validate() {
        return null;
    }
}
