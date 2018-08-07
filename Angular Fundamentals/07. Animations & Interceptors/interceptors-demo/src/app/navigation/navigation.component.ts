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
  ) { 
    this.authService.isAuth();
  }

  logout() {
    this.authService.logout().subscribe(
      data => {
        this.hasError = false;
        this.logoutSuccess();
      },
    err => {
      this.hasError = true;

      
      console.log(err);
      if(err.status === 401 || err.status === 400) {
        this.serverResponse = 'Forbidden Action - Cannot Logout!';
        let myTimer = setInterval(() => {
          this.hasError = false;
          clearInterval(myTimer);
        }, 2000);
      }
    });
  }

  logoutSuccess() {
    console.log("***********************");
    this.authService.isAuthenticated = false;
    localStorage.clear();
    this.router.navigate(['/']);
  }
  
  ngOnInit() {
    
  }
}
