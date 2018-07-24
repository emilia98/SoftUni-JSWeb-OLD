import { Book } from "../domain/Book";

export class BooksData {
    getData() {
        return [
            new Book('It', 'Stephen King', 23.1,new Date(1986, 9, 15)),
            new Book('Harry Potter & the Philosophers stone', 'J.K. Rowling', 22.1, new Date(1997, 6, 26)),
            new Book('Fundamentals of Programming with C#', 'Svetlin Nakov', 20, new Date(2016, 6, 6))
        ]
    }
}