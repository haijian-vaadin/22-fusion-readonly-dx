import { Route } from '@vaadin/router';
import './views/main-layout';
import './views/weather/weather-view';

export type ViewRoute = Route & {
  title?: string;
  icon?: string;
  children?: ViewRoute[];
};

export const views: ViewRoute[] = [
  // place routes below (more info https://vaadin.com/docs/latest/fusion/routing/overview)
  {
    path: '',
    component: 'weather-view',
    icon: '',
    title: '',
  },
  {
    path: 'weather',
    component: 'weather-view',
    icon: 'la la-file',
    title: 'Weather',
  },
];
export const routes: ViewRoute[] = [
  {
    path: '',
    component: 'main-layout',
    children: [...views],
  },
];
