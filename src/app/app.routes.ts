import { Routes } from '@angular/router';
import {ROOT_PATHS} from './core/constants/paths.constants';
import {HomeComponent} from './featrues/home/home.component';

export const appRoutes: Routes = [{
  path:ROOT_PATHS.home,
  component: HomeComponent,
}];
