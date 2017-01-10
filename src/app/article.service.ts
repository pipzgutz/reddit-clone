import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../environments/environment';

import { Article } from './article';

@Injectable()
export class ArticleService {

  constructor(private http: Http) { }

  public getArticles(): Promise<Article[]> {
    let params = new URLSearchParams();
    params.set('apiKey', environment.newsApiKey);
    // params.set('source', 'reddit-r-all');
    params.set('source', 'google-news');
    return this.http
      .get(`${environment.baseUrl}/v1/articles`, {
        search: params
      })
      .toPromise()
      .then(resp => resp.json())
      .then(json => json.articles)
      .then(articles => {
        return articles
          .map(article => Article.fromJSON(article));
      })
      .catch(err => {
        console.log('We got an error ' + err);
      });
  }
}
