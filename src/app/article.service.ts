import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import { environment } from '../environments/environment';

import { Article } from './article';

/*
 * [].sort(compare(a, b))
 * return value
 *  0 == they are equal in sort
 *  1 == a comes before b
 *  -1 == b comes before a
 */
interface ArticleSortFn {
  (a: Article, b: Article): number;
}

interface ArticleSortOrderFn {
  (direction: number): ArticleSortFn;
}

const sortByTime: ArticleSortOrderFn =
  (direction: number) =>
    (a: Article, b: Article) => {
      return direction * (b.publishedAt.getTime() - a.publishedAt.getTime());
    };

const sortByVotes: ArticleSortOrderFn =
  (direction: number) =>
    (a: Article, b: Article) => {
      return direction * (b.votes - a.votes);
    };

const sortFns = {
  'Time': sortByTime,
  'Votes': sortByVotes
};

@Injectable()
export class ArticleService {
  private _articles: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([]);
  private _sources: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private _sortByDirectionSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  private _sortByFilterSubject: BehaviorSubject<ArticleSortOrderFn> = new BehaviorSubject<ArticleSortOrderFn>(sortByTime);
  private _filterBySubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public articles: Observable<Article[]> = this._articles.asObservable();
  public sources: Observable<any> = this._sources.asObservable();
  public orderedArticles: Observable<Article[]>;

  constructor(private http: Http) {
    this.orderedArticles =
      Observable.combineLatest(
        this._articles,
        this._sortByFilterSubject,
        this._sortByDirectionSubject,
        this._filterBySubject
      ).map(([
        articles, sorter, direction, filterStr
      ]) => {
        const re = new RegExp(filterStr, 'gi');
        return articles
          .filter(a => re.exec(a.title))
          .sort(sorter(direction));
      });
  }

  public sortBy(filter: string, direction: number): void {
    this._sortByDirectionSubject.next(direction);
    this._sortByFilterSubject.next(sortFns[filter]);
  }

  public filterBy(filter: string) {
    this._filterBySubject.next(filter);
  }

  public getArticles(): void {
    this._makeHttpRequest('/v1/articles', 'google-news')
      .map(json => json.articles)
      .subscribe(articlesJSON => {
        const articles = articlesJSON
          .map(articlejson => Article.fromJSON(articlejson));
        this._articles.next(articles);
      });
  }

  public getSources(): void {
    this._makeHttpRequest('/v1/sources')
      .map(json => json.sources)
      .filter(list => list.length > 0)
      .subscribe(this._sources);
  }

  private _makeHttpRequest(
    path: string,
    sourceKey?: string
  ): Observable<any> {
    let params = new URLSearchParams();
    params.set('apiKey', environment.newsApiKey);
    if (sourceKey && sourceKey !== '') {
      params.set('source', sourceKey);
    }
    return this.http
      .get(`${environment.baseUrl}${path}`, {
        search: params
      }).map(resp => resp.json());
  }
}
