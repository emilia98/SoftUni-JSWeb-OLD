import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../movie.model';

@Component({
    selector: 'app-movie',
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit{
    @Input('movie') movie :Movie;
    public title :string;
    public date :string;
    public imageUrl :string;
    public id :string;

    constructor() {}

    ngOnInit() {
        this.title = this.movie.title;
        this.date = this.movie.release_date;
        this.imageUrl = `http://image.tmdb.org/t/p/w500/${this.movie.poster_path}`;
        this.id = this.movie.id;
    }
}