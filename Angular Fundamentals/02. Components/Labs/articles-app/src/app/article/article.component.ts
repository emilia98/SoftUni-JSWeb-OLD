import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Article } from '../models/article.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  private symbolsToRead: number = 250;
  @Input() article: Article;
  @Input('description') articleDescription: string;
  public isImageShown: boolean = false;
  public charactersRead: number;
  public couldReadMore: boolean = true;
  public shouldHide: boolean = false;
  public descriptionToShow: string;

  constructor() {
    this.charactersRead = 0;
    this.descriptionToShow = '';
  }

  toggleImage() {
    this.isImageShown = !this.isImageShown;
  }

  readMore() {
    /* Too complex
    let diff = Math.min(this.charactersRead, this.articleDescription.length)
      - this.articleDescription.length;

    if (diff === 0) {
    } 
    */

    this.charactersRead += this.symbolsToRead;
    let total = this.charactersRead;

    if(this.charactersRead >= this.articleDescription.length) {
      total = this.articleDescription.length;
      this.couldReadMore = false;
      this.shouldHide = true;
    }
    
    this.descriptionToShow = this.articleDescription.substr(0,total);
  }

  hideDescription() {
    this.charactersRead = 0;
    this.couldReadMore = true;
    this.shouldHide = false;
    this.descriptionToShow = '';
  }

  ngOnInit() {
  }

}
