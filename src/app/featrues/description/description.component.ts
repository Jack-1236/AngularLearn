import {Component, inject, OnInit, signal} from '@angular/core';
import {CardItemComponent} from "../../core/components/card-item/card-item.component";
import {DecorativeHeaderComponent} from "../../core/components/decorative-header/decorative-header.component";
import {NgForOf} from "@angular/common";
import {GoogleAnalyticsService} from './service/google-analytics.service';

@Component({
  selector: 'app-description',
  imports: [
    CardItemComponent,
    DecorativeHeaderComponent,
    NgForOf,
    DecorativeHeaderComponent,
    CardItemComponent
  ],
  templateUrl: './description.component.html',
  styleUrl: './description.component.scss'
})
export class DescriptionComponent implements OnInit {

  private readonly googleService = inject(GoogleAnalyticsService);

  readonly cardItems = [
    {
      href: 'https://angular.dev/guide/signals',
      title: "Angular Signals",
      body: ["Unlock reactivity with Angular Signals.", "Signals provide a declarative way to manage state and reactivity in your application,simplifying data flow and improving performance."],
      footer: "Learn more about Signals"
    }, {
      href: 'https://angular.dev/guide/i18n',
      title: "Internationalization",
      body: ["Build apps for a global audience.",
        " Angular’s internationalization tools make it seamless to localize your app, handle translations, and format dates, numbers, and currencies for any locale."],
      footer: "Explore Internationalization"
    },
    {
      href: 'https://angular.dev/guide/forms',
      title: "Reactive Forms",
      body: ["Effortless form handling and validation.",
        " Reactive Forms empower you to create robust, dynamic forms with a model-driven approach,making validation, dynamic updates, and testing a breeze."],
      footer: "Start with Reactive Forms"
    },
    {
      href: 'https://angular.dev/guide/animations',
      title: "Animations",
      body: ["Bring your UI to life with Angular Animations.",
        " Create smooth transitions and engaging effects with Angular’s powerful animation API,making your application visually appealing and interactive."],
      footer: "Discover Angular Animations"
    }]

  readonly activeUsers = signal(1)

  ngOnInit(): void {
   // this.fetchRealtimeUsers();
  //  setInterval(() => this.fetchRealtimeUsers(), 5000);
  }

  fetchRealtimeUsers() {
    this.googleService.getRealtimeUsers().subscribe(data => this.activeUsers.set(Math.max(data.activeUsers || 0, 1)));
  }
}
