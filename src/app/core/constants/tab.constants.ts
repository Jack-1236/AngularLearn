import {ROOT_URLS} from './routes.constants';

export const BottomTabs = [
  {
    tabName: "Home",
    tabRoute: ROOT_URLS.homeChild.description
  },
  {
    tabName: "Wallpapers",
    tabRoute: ROOT_URLS.homeChild.wallpapers
  },
  {
    tabName: "User",
    tabRoute: ROOT_URLS.homeChild.user
  },
  {
    tabName: "Setting",
    tabRoute: ROOT_URLS.homeChild.setting
  },
  {
    tabName: "Debug-MobileReport",
    tabRoute: ROOT_URLS.homeChild.debugmobilereport
  }
]
