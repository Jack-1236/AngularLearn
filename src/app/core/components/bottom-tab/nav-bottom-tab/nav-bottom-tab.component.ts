import {Component, Input} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatTabLink, MatTabNav, MatTabNavPanel} from '@angular/material/tabs';
import {NgForOf} from '@angular/common';
import {BaseComponent} from '../../../providers/BaseComponent';

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
export class NavBottomTabComponent  extends BaseComponent{
  @Input() tabs: any[] = [];


}
