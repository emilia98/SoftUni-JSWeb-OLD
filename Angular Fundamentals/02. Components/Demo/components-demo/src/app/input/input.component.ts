import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  public typed_name: string = '';
  public nameShown: boolean = false;
  public componentShown : boolean = false;
  constructor() { }

  showComponent() {
    this.componentShown = !this.componentShown;
  }

  showName(name) {
    this.typed_name = name;
  }

  ngOnInit() {
  }

}
