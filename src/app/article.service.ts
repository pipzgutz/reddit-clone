import { Injectable } from '@angular/core';

import { Article } from './article';

@Injectable()
export class ArticleService {

  constructor() { }

  public getArticles(): Promise<Article[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          new Article('The Angular 2 screencast', 'The easiest way to learn Angular 2 is with Fullstack.io!'),
          new Article('Fullstack React', 'Want to learn React too?'),
          new Article('Vue is new', 'And pretty cool syntax too'),
          new Article('But what about elm?', 'Everybody likes elm...right?')
        ]);
      }, 1000);
    });
  }
}
