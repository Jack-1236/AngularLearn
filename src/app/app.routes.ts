import {Routes} from '@angular/router';
import {Error404Component} from './core/error404/error404.component';
import {DescriptionComponent} from './featrues/description/description.component';
import {UserComponent} from './featrues/user/user.component';
import {SettingComponent} from './featrues/setting/setting.component';
import {ROOT_URLS} from './core/constants/routes.constants';
import {HomeComponent} from './featrues/home/home.component';
import {WallpapersComponent} from './featrues/wallpapers/wallpapers.component';
import {DebugmobilereportComponent} from './featrues/debugmobilereport/debugmobilereport.component';


export const appRoutes: Routes = [
  {
    path: ROOT_URLS.home,
    component: HomeComponent,
    children: [
      { path: '', redirectTo: ROOT_URLS.homeChild.description, pathMatch: 'full' },
      {path: ROOT_URLS.homeChild.description, component: DescriptionComponent},
      {path: ROOT_URLS.homeChild.user, component: UserComponent},
      {path: ROOT_URLS.homeChild.setting, component: SettingComponent},
      {path: ROOT_URLS.homeChild.wallpapers, component: WallpapersComponent},
      {path: ROOT_URLS.homeChild.debugmobilereport, component: DebugmobilereportComponent},
    ]
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
