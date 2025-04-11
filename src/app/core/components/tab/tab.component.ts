import {Component, OnInit} from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {ROOT_URLS} from '../../constants/urls.constants';

@Component({
  selector: 'app-tab',
  imports: [
    MatTabGroup,
    MatTab,
    RouterOutlet,
    NgIf,
    NgForOf,
  ],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss'
})
export class TabComponent implements OnInit {

  selectedTabIndex: number = 0;

  readonly tabLabels = [
    "Home",
    "Wallpapers",
    "User",
    "Setting"
  ]

  private readonly tabs = [
    ROOT_URLS.homeChild.description,
    ROOT_URLS.homeChild.wallpapers,
    ROOT_URLS.homeChild.user,
    ROOT_URLS.homeChild.setting,
  ];

  constructor(private router: Router) {
    this.tabLabels.push("Debug-MobileReport");
    this.tabs.push(ROOT_URLS.homeChild.debugmobilereport);

    this.router.events.subscribe((event) => {
      //获取当前选择的是那个Tab
      if (event instanceof NavigationEnd) {
        const index = this.tabs.findIndex(tab => event.url.includes(tab));
        if (index !== -1) {
          this.selectedTabIndex = index;
        }
      }
    })
  }

  ngOnInit(): void {
    this.router.navigate([ROOT_URLS.home, this.tabs[0]]).then(r => true);
  }

  onTabChange(event: any) {
    this.router.navigate([ROOT_URLS.home, this.tabs[event.index]]).then(r => true);
  }

}
