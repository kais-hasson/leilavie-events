import { Routes } from '@angular/router';
import { PublicLayout } from './pages/layouts/public-layout/public-layout';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayout,
    children: [],
  },
];
