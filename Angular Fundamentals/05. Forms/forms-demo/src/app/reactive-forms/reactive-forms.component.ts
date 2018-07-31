import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormControlName, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent implements OnInit {
  public passForm = new FormGroup({
    currentPass: new FormControl('', [Validators.required,Validators.minLength(3)]),
    newPass: new FormControl(''),
    repeatPass: new FormControl('')
  });

  public passFromDb = 'pesho123';

  constructor() { }

  onClicked(field) {
    console.log(field);
  }
  log() {
    /*
    let currentPassword = this.passForm.get('currentPass').value;
    let newPassword = this.passForm.get('newPass').value;
    let repeatPassword = this.passForm.get('repeatPass').value;

    if(currentPassword !== this.passFromDb) {
      return alert('Wrong password!');
    }

    if(newPassword !== repeatPassword) {
      return alert('Passwords do not match!');
    }
    alert('Success!');
*/
    console.log(this.passForm);
  }
  ngOnInit() {
  }

}
