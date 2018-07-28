import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movies } from '../movies/movies.model';

const apiKey = '25f3dfb68feff096a3b044ff8ae3bb13';

@Injectable({
  providedIn: 'root'
})
export class MoviesService implements OnInit{
  public path :string = 'https://api.themoviedb.org/3/';
  public popular :string = 'discover/movie?sort_by=popularity.desc';
  public theaters :string = 'discover/movie?primary_release_date.gte=2018-07-01&primary_release_date.lte=2018-07-31'
  public authentication :string = `&api_key=${apiKey}`;


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
  
  ngOnInit() {}
}
