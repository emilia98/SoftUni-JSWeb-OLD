import { AbstractControl, Validator, ValidationErrors } from '@angular/forms';

export class UsernameValidator implements Validator {
    static cannotContainSpace (v :AbstractControl) :ValidationErrors | null {
        //if(v.value.includes(''))
        if(/\s+/g.test(v.value)) {
            return { space: true}
        }
        return null;
    }

    static shouldMatchThePattern (v :AbstractControl) :ValidationErrors | null {
        if(!/([A-Z]+?)/g.test(v.value) || 
           !/([a-z]+?)/g.test(v.value) || 
           !/([0-9]+?)/g.test(v.value)) {
            return { noMatch: true}
        }
        return null;
    }
    validate() {
        return null;
    }
}
