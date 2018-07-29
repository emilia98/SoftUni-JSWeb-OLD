import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../service/movies.service';

@Component({
    selector: 'movie-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class MovieDetailsComponent implements OnInit{
    // public id :string;
    public movie :MovieDetails = null;

    constructor(
        private route :ActivatedRoute,
        private movieService :MoviesService
    ) { }

    ngOnInit() {
        this.route.params.subscribe( (params) => {
            let id = params.id;
            this.movieService
              .getMovie(id)
              .subscribe(data => {
                  this.movie = data;
              });
        });
    }
}