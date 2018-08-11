import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-sidebar-item',
})
export class SidebarItemComponent implements OnInit {
    @Input() color :string;
    constructor() {

    }

    ngOnInit() {
        console.log(this.color);
    }
}