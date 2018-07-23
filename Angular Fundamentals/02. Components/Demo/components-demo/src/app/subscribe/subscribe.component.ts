import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Game } from '../domain/game';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {
  @Input('subscription') gameSubscribe:Game;
  @Output() notification = new EventEmitter<string>();
  constructor() { }

  subscribeForGame() {
    console.log(this.gameSubscribe.id);
    this.notification.emit('Subscription is successful!');
  }
  ngOnInit() {
    // console.log(this.gameSubscribe);
  }

}
