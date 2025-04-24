import {Component, Input} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatTabLink, MatTabNav, MatTabNavPanel} from '@angular/material/tabs';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-nav-bottom-tab',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatTabNav,
    MatTabLink,
    MatTabNavPanel,
    RouterOutlet,
    NgForOf
  ],
  templateUrl: './nav-bottom-tab.component.html',
  styleUrl: './nav-bottom-tab.component.scss'
})
export class NavBottomTabComponent {
  @Input() tabs: any[] = [];

  constructor() {
  }
}
