import { Component } from '@angular/core';
import {
    trigger, state, animate, transition, style
} from '@angular/animations';

@Component({
    selector: 'app-first-animation',
    templateUrl: 'first-animation.component.html',
    styleUrls: ['first-animation.component.css'],
    animations: [
        trigger('divState', [
            state('normal', style({
                'background-color': 'red',
                'transform': 'translateX(0)'
            })),
            state('highlighted', style({
                backgroundColor: 'blue',
                transform: 'translateX(100px)'
            })),
            transition("normal => highlighted", animate(300)),
            transition("highlighted => normal", animate(800))
        ]),
        trigger('wildState', [
            state('normal', style({
                'background-color': 'red',
                'transform': 'translateX(0) scale(1)'
            })),
            state('highlighted', style({
                'background-color': 'blue',
                'transform': 'translateX(100px) scale(1)'
            })),
            state('shrunken', style({
                'background-color': 'green',
                'transform': 'translateX(0) scale(0.5)'
            })),
            transition("normal <=> highlighted", animate(500)),
            transition("shrunken => *", animate(800)),
            transition("normal => shrunken", animate(1000)),
            transition("highlighted => shrunken", animate(300)),
        ])
    ]
})
export class FirstAnimationComponent {
    public state: string = 'normal';
    public wildState: string = 'normal';
    constructor() { }

    animate() {
        this.state === 'normal'
            ? this.state = 'highlighted'
            : this.state = 'normal';

        this.wildState === 'normal'
            ? this.wildState = 'highlighted'
            : this.wildState = 'normal';
    }

    shrink() {
        if (this.wildState === 'normal' || this.wildState === 'highlighted') {
            this.wildState = 'shrunken';
            return;
        }
        this.wildState = 'normal';
    }
}