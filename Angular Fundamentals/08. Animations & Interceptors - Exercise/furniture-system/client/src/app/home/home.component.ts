import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username : string;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    // console.log(this.authService);
    let currentUser = JSON.parse(localStorage.getItem('user'));
    // console.log(currentUser);
    if (currentUser) {
       this.username = JSON.parse(localStorage.getItem('user')).username;
    }
  }

}
