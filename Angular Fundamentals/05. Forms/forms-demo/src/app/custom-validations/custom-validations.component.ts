import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormControlName, Validators} from '@angular/forms';
import { UsernameValidator } from './validations';
@Component({
  selector: 'app-custom-validations',
  templateUrl: './custom-validations.component.html',
  styleUrls: ['./custom-validations.component.css']
})
export class CustomValidationsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public loginForm = new FormGroup({
    password: new FormControl(''),
    username: new FormControl('', [UsernameValidator.cannotContainSpace, UsernameValidator.shouldMatchThePattern])
  });

  public passFromDb = 'pesho123';


  log() {
    console.log(this.loginForm);
  }

  onClicked(field) {
    console.log(field);
  }

}
