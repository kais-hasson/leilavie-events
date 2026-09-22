import { MenuItem } from './menu-item';

export const menuItems: MenuItem[] = [
  {
    id: 'home',
    title: 'Home',
    type: 'link',
    route: '/home',
    sectionId: 'home',
  },
  {
    id: 'about',
    title: 'About',
    type: 'link',
    route: '/about',
    sectionId: 'about',
  },
  {
    id: 'contact-us',
    title: 'Contact Us',
    type: 'link',
    route: '/contact-us',
    sectionId: 'contact-us',
  },
  {
    id: 'our-services',
    title: 'Our Services',
    type: 'link',
    route: '/our-services',
    sectionId: 'our-services',
  },
];
