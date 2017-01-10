import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Article } from './article';

const baseUrl = 'https://newsapi.org';
const newsApiKey = '15c8df2fc03f472a87eb0d164dda26f2';

@Injectable()
export class ArticleService {

  constructor(private http: Http) { }

  public getArticles(): Promise<Article[]> {
    let params = new URLSearchParams();
    params.set('apiKey', newsApiKey);
    params.set('source', 'reddit-r-all');
    return this.http
      .get(`${baseUrl}/v1/articles`, {
        search: params
      })
      .toPromise()
      .then(resp => resp.json())
      .then(json => json.articles)
      .then(articles => {
        const list = articles
          .map(article => new Article(
            article.title,
            article.description,
            article.urlToImage
          ));
        return list;
      })
      .catch(err => {
        console.log('We got an error ' + err);
      });
  }
}
