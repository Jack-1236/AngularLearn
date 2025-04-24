import {Component} from '@angular/core';
import {HeaderComponent} from '../../core/components/header/header.component';
import {MatBottomTabComponent} from '../../core/components/bottom-tab/mat-bottom-tab/mat-bottom-tab.component';
import {BottomTabs} from '../../core/constants/tab.constants';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, MatBottomTabComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  protected readonly BottomTabs = BottomTabs;

}
