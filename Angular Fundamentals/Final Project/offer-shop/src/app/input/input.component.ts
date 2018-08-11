import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html'
})
export class InputComponent implements OnInit {
    @Input('color') color :string;
    @Input('icon') icon :string;
    @Input('title') title :string;
    //@Input('parentClick') click;
    @Output() clicked = new EventEmitter();
    // counter = 0;
    constructor() {

    }

    hello :string = 'hello'

    click() {
        //this.clicked.
        this.clicked.emit(this.hello);
        //this.counter = this.counter + 1;
        //this.clicked.emit(this.counter)
        //console.log('child click');
    }

    ngOnInit() {
        console.log(this.color);
    }
}