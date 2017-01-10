import { Component, Input } from '@angular/core';

class Article {
  constructor(
    public title: string,
    public description: string) { }
}

@Component({
  selector: 'app-sidebar',
  template: `
    <div id="sidebar">
      sidebar will go here
    </div>
  `
})
export class SidebarComponent { }

@Component({
  selector: 'app-article',
  template: `
    <div>
      <h2>{{article.title}}</h2>
      <p>{{article.description}}</p>
    </div>
  `
})
export class ArticleComponent {
  @Input()
  article: Article;
}

@Component({
  selector: 'app-root',
  template: `
    <div id="container">
      <app-sidebar></app-sidebar>
      <div id="content">
        <app-article 
          *ngFor="let article of articles"
          [article]="article" >
        </app-article>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  articles: Article[];

  constructor() {
    this.articles = [
      new Article('The Angular 2 screencast', 'The easiest way to learn Angular 2 is with Fullstack.io!'),
      new Article('Fullstack React', 'Want to learn React too?'),
      new Article('Vue is new', 'And pretty cool syntax too'),
      new Article('But what about elm?', 'Everybody likes elm...right?')
    ];
  }
}
