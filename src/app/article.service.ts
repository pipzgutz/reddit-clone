import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import { environment } from '../environments/environment';

import { Article } from './article';

@Injectable()
export class ArticleService {
  private _articles: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([]);
  public articles: Observable<Article[]> = this._articles.asObservable();

  constructor(private http: Http) { }

  public getArticles(): void {
    // TODO make the http request -> Observable
    // TODO convert response into article class
    // TODO update our subject
    this._makeHttpRequest('/v1/articles', 'google-news')
      .map(json => json.articles)
      .subscribe(articlesJSON => {
        const articles = articlesJSON
          .map(articlejson => Article.fromJSON(articlejson));
        this._articles.next(articles);
      });
  }

  private _makeHttpRequest(
    path: string,
    sourceKey: string
  ): Observable<any> {
    let params = new URLSearchParams();
    params.set('apiKey', environment.newsApiKey);
    params.set('source', sourceKey);
    return this.http
      .get(`${environment.baseUrl}${path}`, {
        search: params
      }).map(resp => resp.json());
  }
}
