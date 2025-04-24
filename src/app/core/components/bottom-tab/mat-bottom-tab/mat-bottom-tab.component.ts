import {AfterViewInit, Component, ElementRef, Input, ViewChild,} from '@angular/core';
import {MatTabGroup, MatTabsModule} from "@angular/material/tabs";
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {NgForOf} from '@angular/common';
import {ROOT_URLS} from '../../../constants/routes.constants';
import {BottomTabs} from '../../../constants/tab.constants';
import {BaseComponent} from '../../../providers/BaseComponent';

@Component({
  selector: 'app-mat-bottom-tab',
  imports: [
    MatTabGroup,
    MatTabsModule,
    RouterOutlet,
    NgForOf,
  ],
  templateUrl: './mat-bottom-tab.component.html',
  styleUrl: './mat-bottom-tab.component.scss'
})
export class MatBottomTabComponent extends BaseComponent implements AfterViewInit {
  selectedTabIndex: number = 0;
  @Input() tabs: any[] = [];
  @ViewChild('tabContent') tabContent: ElementRef | undefined;

  constructor(private router: Router) {
    super();
    this.safeSubscribe("RouterEvents", this.router.events.pipe(), {
      next: (event) => {   //获取当前选择的是那个Tab
        if (event instanceof NavigationEnd) {
          const index = BottomTabs.findIndex(tab => event.url.includes(tab.tabRoute));
          if (index !== -1) {
            this.selectedTabIndex = index;
          }
        }
      }
    })
  }

  ngAfterViewInit(): void {
    const hammer = new Hammer(this.tabContent?.nativeElement);
    hammer.on('swipeleft', () => {
      this.onSwipe('left');
    });
    hammer.on('swiperight', () => {
      this.onSwipe('right');
    });

  }

  onTabChange(event: any) {
    this.router.navigate([ROOT_URLS.home, BottomTabs[event.index].tabRoute]).then(r => true);
  }

  private onSwipe(direction: string) {
    if (direction === 'left') {
      if (this.selectedTabIndex != this.tabs.length - 1) {
        this.selectedTabIndex += 1;
      }
    }
    if (direction === 'right') {
      if (this.selectedTabIndex != 0) {
        this.selectedTabIndex -= 1;
      }
    }

  }


}


