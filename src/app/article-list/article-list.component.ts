import { Component, Input, OnInit } from '@angular/core';

import { Article } from '../article';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
  providers: [ArticleService]
})
export class ArticleListComponent implements OnInit {
  @Input()
  articles: Article[];

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.getArticles()
      .then(articles => this.articles = articles);
  }

}
