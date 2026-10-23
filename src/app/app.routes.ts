import { inject } from '@angular/core';
import { CanMatchFn, Routes } from '@angular/router';
import { LeilavieLayout } from './pages/layouts/leilavie-layout/leilavie-layout';
import { Layout } from './pages/layouts/layout';
import { SettingsService } from './services/settings.service';

const publicLayout: CanMatchFn = () => inject(SettingsService).layout() === 'public';
const leilavieLayout: CanMatchFn = () => inject(SettingsService).layout() === 'leilavie';

export const routes: Routes = [
{
    path: '',
    component: Layout,
    children: [
      {
      path: '',
      canMatch: [publicLayout],
        loadComponent: () => import('./pages/public-layout-components/home/home').then(m => m.Home)
    },
      {
      path: '',
      canMatch: [leilavieLayout],
        loadComponent: () => import('./pages/leilavie-layout-component/leilavie-home/leilavie-home').then(m => m.LeilavieHome)
    },
      {
      path: 'home',
      canMatch: [publicLayout],
        loadComponent: () => import('./pages/public-layout-components/home/home').then(m => m.Home)
    },
      {
      path: 'home',
      canMatch: [leilavieLayout],
        loadComponent: () => import('./pages/leilavie-layout-component/leilavie-home/leilavie-home').then(m => m.LeilavieHome)
    },
      {
      path:"about",
       canMatch: [publicLayout],
      loadComponent: () => import('./pages/public-layout-components/about/about').then(m => m.About)
    },
      {
      path:"appointment",
       canMatch: [publicLayout],
      loadComponent: () => import('./pages/public-layout-components/appointment/appointment').then(m => m.Appointment)
    },{
      path:"our-services",
       canMatch: [publicLayout],
      loadComponent: () => import('./pages/public-layout-components/our-services/our-services').then(m => m.OurServices)
    },{
      path:"contact-us",
       canMatch: [publicLayout],
      loadComponent: () => import('./pages/public-layout-components/contact-us/contact-us').then(m => m.ContactUs)
    },
      {
      path:"about",
       canMatch: [leilavieLayout],
      loadComponent: () => import('./pages/leilavie-layout-component/leilavie-about/leilavie-about').then(m => m.LeilavieAbout)
    },
      {
      path:"appointment",
       canMatch: [leilavieLayout],
      loadComponent: () => import('./pages/leilavie-layout-component/leilavie-appointment/leilavie-appointment').then(m => m.LeilavieAppointment)
    },{
      path:"our-services",
       canMatch: [leilavieLayout],
      loadComponent: () => import('./pages/leilavie-layout-component/leilavie-our-services/leilavie-our-services').then(m => m.LeilavieOurServices)
    },{
      path:"contact-us",
       canMatch: [leilavieLayout],
      loadComponent: () => import('./pages/leilavie-layout-component/leilavie-contact-us/leilavie-contact-us').then(m => m.LeilavieContactUs)
    },
    ],
  },
  {
    path: 'Leilavie',
    component: LeilavieLayout,
    children: [
   
    ],
  },
];
