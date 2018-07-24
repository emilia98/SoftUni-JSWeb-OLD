import { Component, OnInit } from '@angular/core';
import { Book } from '../../domain/Book';
import { BooksData as BooksService } from '../../services/BooksData';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  public books :Array<Book> = [];
  constructor() { }

  ngOnInit() {
    this.books = new BooksService().getData();
    console.log(this.books);
  }

}
