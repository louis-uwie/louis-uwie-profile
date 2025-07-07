import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { NgComponentOutlet } from '@angular/common';

// Import your page components
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Career } from './pages/career/career';
import { Repositories } from './pages/repositories/repositories';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NgComponentOutlet,
    InfiniteScrollDirective,
    Home,
    About,
    Career,
    Repositories,
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  loading = false;
  page = 0;

  availablePages = [Home, About, Career, Repositories];
  loadedPages: any[] = [];

  constructor() {
    this.loadNextPage();
  }

  loadNextPage() {
    if (this.page < this.availablePages.length) {
      this.loading = true;
      setTimeout(() => {
        this.loadedPages.push(this.availablePages[this.page]);
        this.page++;
        this.loading = false;
      }, 600);
    }
  }

  onScroll() {
    if (!this.loading) {
      this.loadNextPage();
    }
  }
}
