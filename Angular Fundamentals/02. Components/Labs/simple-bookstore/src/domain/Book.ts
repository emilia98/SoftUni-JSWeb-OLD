export class Book {
    public title: string;
    public author: string;
    public price: number;
    public publishedOn: Date;

    constructor(title: string, author: string, price: number, publishedOn: Date) {
        this.title = title;
        this.author = author;
        this.price = price;
        this.publishedOn = publishedOn;
    }
}