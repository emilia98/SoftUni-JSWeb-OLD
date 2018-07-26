import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { GitHubProfile } from './github.profile';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    providers: [ ProfileService ]
})

export class ProfileComponent implements OnInit {
    // public profile :Object; // there is better idea
    public profile :GitHubProfile;
    
    constructor(
        private profileService :ProfileService
    ) {}

    ngOnInit() {
        this.profileService
          .getData('emilia98')
          .subscribe(
              data => this.profile = data,
              err => console.log(err)
          );
    }
}