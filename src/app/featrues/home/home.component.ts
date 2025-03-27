import {Component} from '@angular/core';
import {DecorativeHeaderComponent} from '../../core/components/decorative-header/decorative-header.component';
import {NgForOf, NgOptimizedImage} from '@angular/common';
import {CardItemComponent} from '../../core/components/card-item/card-item.component';

@Component({
  selector: 'app-home',
  imports: [DecorativeHeaderComponent, NgOptimizedImage, CardItemComponent, NgForOf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  readonly cardItems = [
    {
      href: "'https://angular.dev/guide/signals'",
      title: "Angular Signals",
      body: ["Unlock reactivity with Angular Signals.", "Signals provide a declarative way to manage state and reactivity in your application,\n" +
      "          simplifying data flow and improving performance."],
      footer: "Learn more about Signals"
    }, {
      href: "'https://angular.dev/guide/i18n'",
      title: "Internationalization",
      body: ["Build apps for a global audience.",
        " Angular’s internationalization tools make it seamless to localize your app, handle\n" +
        "          translations, and format dates, numbers, and currencies for any locale."],
      footer: "Explore Internationalization"
    },
    {
      href: "'https://angular.dev/guide/forms'",
      title: "Reactive Forms",
      body: ["Effortless form handling and validation.",
        " Reactive Forms empower you to create robust, dynamic forms with a model-driven approach,\n" +
        "          making validation, dynamic updates, and testing a breeze."],
      footer: "Start with Reactive Forms"
    },
    {
      href: "'https://angular.dev/guide/animations'",
      title: "Animations",
      body: ["Bring your UI to life with Angular Animations.",
        " Create smooth transitions and engaging effects with Angular’s powerful animation API,\n" +
        "          making your application visually appealing and interactive."],
      footer: "Discover Angular Animations"
    }]

}
