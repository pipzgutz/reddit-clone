import { Component, Input, OnInit } from '@angular/core';

import { Article } from '../article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input()
  article: Article;

  constructor() { }

  ngOnInit() {
  }

  upvote() {
    this.article.voteUp();
  }

  downvote() {
    this.article.voteDown();
  }

}
