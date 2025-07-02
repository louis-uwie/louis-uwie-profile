import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Career } from './pages/career/career';
import { Repositories } from './pages/repositories/repositories';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'career', component: Career },
  { path: 'repositories', component: Repositories },
];
