import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../service/movies.service';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers: [ MoviesService ]
})
export class MoviesComponent implements OnInit {
  public popular;
  public inTheater;
  constructor(private moviesService :MoviesService) { }

  ngOnInit() {
    this.moviesService
      .getPopular()
      .subscribe(data => {
        this.popular = data;
      });

    this.moviesService
      .getInTheater()
      .subscribe(data => {
        this.inTheater = data;
      }); 
  }
}
