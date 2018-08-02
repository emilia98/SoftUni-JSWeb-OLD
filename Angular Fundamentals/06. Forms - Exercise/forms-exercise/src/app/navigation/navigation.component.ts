import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
 // providers: [ AuthenticationService ]
})
export class NavigationComponent implements OnInit {
  public hasError :boolean = false;
  public serverResponse :string = '';
  public isAuthenticated :boolean;
  
  constructor(
    private authService :AuthenticationService,
    private router : Router
  ) { }

  logout() {
    this.authService.logout().subscribe(
      data => {
        this.hasError = false;
        this.logoutSuccess();
      },
    err => {
      this.hasError = true;

      if(err.status === 401) {
        this.serverResponse = 'Forbidden Action - Cannot Logout!';
        let myTimer = setInterval(() => {
          this.hasError = false;
          clearInterval(myTimer);
        }, 2000);
      }
    });
  }

  /*
  isLoggedIn() {
    this.authService.isAuth().subscribe(
      data => {
        this.isAuthenticated = true;
        this.router.navigate(['/home']);
        // console.log(data)
      },
      err => {
        this.isAuthenticated = false;
        // console.log(err)
      }
    );
    // this.authService.isAuth();
    //console.log('here');
    // this.authService.isAuth().subscribe(data => console.log(data));
  }
  */

  logoutSuccess() {
    this.authService.isAuthenticated = false;
    localStorage.clear();
    this.router.navigate(['/']);
  }
  
  ngOnInit() {
    console.log(this.authService)
    console.log(this.authService.date);
   // console.log(this.authService.date);
   // this.isLoggedIn();
  }

}
