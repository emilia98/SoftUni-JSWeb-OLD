import  {
    Validator,
    ValidationErrors,
    AbstractControl
} from '@angular/forms';

export class EmailValidator implements Validator {
    static hasCorrectFormat(c :AbstractControl) : ValidationErrors | null {
        let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(pattern.test(c.value)) {
            return null;
        }

        return { hasIncorrectFormat: true};
    }
    
    validate() {
        return null;
    }
}