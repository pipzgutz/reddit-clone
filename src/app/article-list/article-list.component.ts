import { Component, Input, OnInit } from '@angular/core';

import { Article } from '../article';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  @Input()
  articles: Article[];

  constructor() {}

  ngOnInit() {
    this.articles = [
      new Article('The Angular 2 screencast', 'The easiest way to learn Angular 2 is with Fullstack.io!'),
      new Article('Fullstack React', 'Want to learn React too?'),
      new Article('Vue is new', 'And pretty cool syntax too'),
      new Article('But what about elm?', 'Everybody likes elm...right?')
    ];
  }

}
