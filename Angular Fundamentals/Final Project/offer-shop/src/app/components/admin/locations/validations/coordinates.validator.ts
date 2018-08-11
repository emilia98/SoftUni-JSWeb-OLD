import { 
    AbstractControl, 
    Validator, 
    ValidationErrors } 
  from '@angular/forms';

export class LatitudeValidator implements Validator {
    static isValidLatitude(c :AbstractControl) : ValidationErrors | null {
        let pattern = /^(\-?)(\d*?)(\.?)(\d+)$/g;

        if(pattern.test(c.value)) {
            let toNumber = parseFloat(c.value);

            if(toNumber >= -90 && toNumber <= 90) {
                return null;
            }

            return { invalidLatitude : true }
        }

        return { invalidLatitude : true }
    }

    validate() {
        return null;
    }
}

export class LongitudeValidator implements Validator {
    static isValidLongitude(c :AbstractControl) : ValidationErrors | null {
        let pattern = /^(\-?)(\d*?)(\.?)(\d+)$/g;

        if(pattern.test(c.value)) {
            let toNumber = parseFloat(c.value);

            if(toNumber >= -180 && toNumber <= 180) {
                return null;
            }
            return { invalidLongitude : true}
        }

        return { invalidLongitude : true}
    }

    validate() {
        return null;
    }
}