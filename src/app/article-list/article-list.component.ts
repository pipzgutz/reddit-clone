import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { Article } from '../article';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
  providers: [ArticleService]
})
export class ArticleListComponent implements OnInit {
  private articles: Observable<Article[]>;

  constructor(
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute) {
    this.articles = articleService.orderedArticles;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const sourceKey = params['sourceKey'];
      this.articleService.updateArticles(sourceKey);
    });
  }

}
