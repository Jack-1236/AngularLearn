import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ProgressBarComponent} from './core/components/progress-bar/progress-bar.component';
import {Title} from '@angular/platform-browser';
import {HeaderComponent} from './core/components/header/header.component';
import {CookiePopupComponent} from './core/components/cookie-popup/cookie-popup.component';
import {FooterComponent} from './core/components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [ProgressBarComponent, HeaderComponent, CookiePopupComponent, RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly titleService = inject(Title);


  ngOnInit(): void {
    this.titleService.setTitle('Angular Demo03 Root');
  }

  focusFirstHeading() {
  }
}
