import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../service/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers: [MoviesService]
})
export class MoviesComponent implements OnInit {
  public popular;
  public inTheater;
  public kids;
  public dramas;
  public isSearch :boolean = false;
  public movies;
  constructor(private moviesService: MoviesService) { }

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

    this.moviesService
      .getKids()
      .subscribe(data => {
        this.kids = data;
      });

      this.moviesService
      .getDramas()
      .subscribe(data => {
        this.dramas = data;
      })
  }

  search(value) {
    this.isSearch = true;

    this.moviesService.findAName(value.search).subscribe(data => {
      this.movies = data.results;
    })
  }

  clearSearch() {
    this.isSearch = false;
  }
}
