import { AbstractControl, Validator, ValidationErrors } from '@angular/forms';

export class UsernameValidator implements Validator {
    static doesStartWithCapital(c :AbstractControl) : ValidationErrors | null{
        if(/^[A-Z]/g.test(c.value)) {
            return null;
        }
        return { startsWithCapital : false };
        
    }
    
    static hasOnlyAplhanumerics(c :AbstractControl) : ValidationErrors | null {
        if(/^[A-Za-z0-9]+$/g.test(c.value)) {
             return null;
        }
        return { hasOnlyAlphanumerics : false };
    }
    
    validate() {
        return null
    }
}