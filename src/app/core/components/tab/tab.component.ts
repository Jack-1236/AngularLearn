import {Component, OnInit} from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {NgIf} from '@angular/common';
import {ROOT_URLS} from '../../constants/urls.constants';

@Component({
  selector: 'app-tab',
  imports: [
    MatTabGroup,
    MatTab,
    RouterOutlet,
    NgIf,
  ],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss'
})
export class TabComponent implements OnInit {

  selectedTabIndex: number = 0;

  private readonly tabs = [
    ROOT_URLS.homeChild.description,
    ROOT_URLS.homeChild.user,
    ROOT_URLS.homeChild.setting,
    ROOT_URLS.homeChild.images
  ];

  constructor(private router: Router) {
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
