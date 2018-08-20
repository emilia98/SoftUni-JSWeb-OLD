import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: [ './navigation.component.css']
})
export class NavigationComponent implements OnInit {
    public isUserMenuToggled = false;
    
    constructor() {}

    closeUserMenu() {
        this.isUserMenuToggled = false;
    }

    toggleUserMenu() {
        this.isUserMenuToggled = !this.isUserMenuToggled;
    }

    ngOnInit() {}
}