import { Component, OnInit } from '@angular/core';
import { Game } from '../domain/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  games: Array<Game>;
  gamesShown: boolean = false;
  icon: string = 'https://cdn3.iconfinder.com/data/icons/pix-glyph-set/50/520626-gaming_remote-512.png'

  constructor() { 
    this.games = [
      { id: 0, title: 'Need for Speed - U2', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/10/Nfsu2-win-cover.jpg/220px-Nfsu2-win-cover.jpg'},
      { id: 1, title: 'The Sims 4', image: 'https://s3.gaming-cdn.com/images/products/272/271x377/272.jpg'}
    ];
  }

  showGames() {
    this.gamesShown = !this.gamesShown;
  }

  notify(message :string) {
    console.log(message);
  }

  ngOnInit() {
  }

}
