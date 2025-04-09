import { Component } from '@angular/core';
import {TabComponent} from "../../core/components/tab/tab.component";

@Component({
  selector: 'app-home',
  imports: [
    TabComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
