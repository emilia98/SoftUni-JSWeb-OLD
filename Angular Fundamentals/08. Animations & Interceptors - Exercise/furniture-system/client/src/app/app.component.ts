import { Component, OnInit } from '@angular/core';
import { AuthService } from './authentication/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public title :string = 'app';
  public isAuthenticated :boolean = null;
  constructor(
    private authService :AuthService
  ) {}

  ngOnInit() {
    this.authService.checkAuth();
    // console.log('sfjsafhasfjasfjksafjks');
    /*this.authService.checkAuth().subscribe(
      (data) => {
        this.authService.
        this.isAuthenticated = true;
        console.log(data)
      },
      (err) => {
        this.isAuthenticated = false;
        console.log(err);
      }
    )*/
    // this.authService.isAuthenticated
  }
}
