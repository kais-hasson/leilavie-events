import { Routes } from '@angular/router';
import { PublicLayout } from './pages/layouts/public-layout/public-layout';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayout,
    children: [
      {
      path:"home",
      loadComponent: () => import('./pages/home/home').then(m => m.Home)
    },
      {
      path:"about",
      loadComponent: () => import('./pages/about/about').then(m => m.About)
    },
      {
      path:"appointment",
      loadComponent: () => import('./pages/appointment/appointment').then(m => m.Appointment)
    },{
      path:"our-services",
      loadComponent: () => import('./pages/our-services/our-services').then(m => m.OurServices)
    },{
      path:"contact-us",
      loadComponent: () => import('./pages/contact-us/contact-us').then(m => m.ContactUs)
    },
    ],
  },
];
