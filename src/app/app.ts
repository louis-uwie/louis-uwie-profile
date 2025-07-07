import {
  Component,
  AfterViewInit,
  ElementRef,
  QueryList,
  ViewChildren,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { NgComponentOutlet } from '@angular/common';

// Page components
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Education } from './pages/education/education';
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
    Education,
    Career,
    Repositories,
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App implements AfterViewInit {
  loading = false;
  page = 0;

  availablePages = [Home, About, Education, Career, Repositories];
  loadedPages: any[] = [];

  public currentPageIndex = 0;

  @ViewChildren('pageRef') pageElements!: QueryList<ElementRef>;
  private observer!: IntersectionObserver;
  private snapTimeout: any;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      this.loadNextPage();
    }
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

  private observePages() {
    if (!this.isBrowser) return;

    if (this.observer) {
      this.observer.disconnect();
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        const mostVisible = visibleEntries.sort(
          (a, b) => b.intersectionRatio - a.intersectionRatio,
        )[0];

        if (mostVisible && mostVisible.intersectionRatio >= 0.1) {
          clearTimeout(this.snapTimeout);

          this.currentPageIndex = this.pageElements
            .toArray()
            .findIndex((el) => el.nativeElement === mostVisible.target);
        }
      },
      {
        threshold: Array.from({ length: 11 }, (_, i) => i * 0.1),
        root: null,
      },
    );

    this.pageElements.forEach((el) => this.observer.observe(el.nativeElement));
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.observePages();

      this.pageElements.changes.subscribe(() => this.observePages());
    }
  }

  trackByFn(index: number, component: any): any {
    return component;
  }

  scrollToPage(index: number) {
    const pages = this.pageElements.toArray();
    if (pages[index]) {
      pages[index].nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }
}
