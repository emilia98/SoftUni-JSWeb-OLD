import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movies } from '../movies/movies.model';
import { MoviesComponent } from '../movies/movies.component';

const apiKey = '25f3dfb68feff096a3b044ff8ae3bb13';

@Injectable({
  providedIn: 'root'
})
export class MoviesService implements OnInit{
  public path :string = 'https://api.themoviedb.org/3/';
  public popular :string = 'discover/movie?sort_by=popularity.desc';
  public theaters :string = 'discover/movie?primary_release_date.gte=2018-07-01&primary_release_date.lte=2018-07-31'
  public authentication :string = `&api_key=${apiKey}`;
  public kids :string = 'discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc';
  public drama :string = 'discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=5000';


  constructor(private httpClient :HttpClient) { }

  getPopular() :Observable<Movies>{
    let url = this.path + this.popular + this.authentication;
    return this.httpClient.get<Movies>(url);
  }

  getInTheater() :Observable<Movies>{
    return this.httpClient.get<Movies>(
      `${this.path}${this.theaters}${this.authentication}`
    )
  }

  getKids() :Observable<Movies>{
    return this.httpClient.get<Movies>(
      `${this.path}${this.kids}${this.authentication}`
    );
  }

  getDramas() :Observable<Movies>{
    return this.httpClient.get<Movies>(
      `${this.path}${this.drama}${this.authentication}`
    )
  }

  getMovie(id :string) :Observable<MovieDetails>{
    return this.httpClient.get<MovieDetails>(
      `${this.path}movie/${id}?api_key=${apiKey}`
    )
  }

  findAName(name :string) {
    return this.httpClient.get<Movies>(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${name}`
    );
  }

  ngOnInit() {}
}
