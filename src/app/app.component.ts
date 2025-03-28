import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ProgressBarComponent} from './core/components/progress-bar/progress-bar.component';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [ProgressBarComponent, RouterOutlet],
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
