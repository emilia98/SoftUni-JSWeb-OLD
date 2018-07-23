import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-livechange',
  templateUrl: './livechange.component.html',
  styleUrls: ['./livechange.component.css']
})
export class LivechangeComponent implements OnInit {
  public componentToShow: boolean = false;
  public user_name: string = '';
  constructor() { }

  changeVisibility() {
    this.componentToShow = !this.componentToShow;
  }

  ngOnInit() {
  }

}
