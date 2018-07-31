import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html',
  styleUrls: ['./template-driven-form.component.css']
})
export class TemplateDrivenFormComponent implements OnInit {
  model :Object;

  constructor() { 
    this.model= {
      processor: "Inter I7"
    };
  }

  login(data) {
    console.log(data.value);
  }
  show(field) {
    console.log(field);
  }
  ngOnInit() {
  }

}
