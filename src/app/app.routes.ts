import {Routes} from '@angular/router';
import {Error404Component} from './core/error404/error404.component';
import {DescriptionComponent} from './featrues/description/description.component';
import {UserComponent} from './featrues/user/user.component';
import {SettingComponent} from './featrues/setting/setting.component';
import {ROOT_URLS} from './core/constants/urls.constants';
import {HomeComponent} from './featrues/home/home.component';

export const appRoutes: Routes = [
  {
    path: ROOT_URLS.home,
    component: HomeComponent,
    children: [
      {path: ROOT_URLS.homeChild.description, component: DescriptionComponent},
      {path: ROOT_URLS.homeChild.user, component: UserComponent},
      {path: ROOT_URLS.homeChild.setting, component: SettingComponent}]
  },

  {
    path: '404',
    component: Error404Component
  },
  {
    path: '**',
    redirectTo: '404'
  },
];
