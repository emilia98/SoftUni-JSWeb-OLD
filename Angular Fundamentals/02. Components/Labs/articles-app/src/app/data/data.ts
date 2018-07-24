import { Article } from "../models/article.model";
import { data } from "./seed";

export class ArticlesData {
    public articles :Array<Article> = [];

    getData(): Array<Article> {
        for(let entry of data) {
            let article = new Article(
                entry.title, entry.description,
                entry.author, entry.imageUrl
            ); 
            this.articles.push(article);
        }
        return this.articles;
    }  
}