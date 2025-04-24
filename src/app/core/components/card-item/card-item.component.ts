import {Component, input} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {NgTemplateOutlet} from '@angular/common';
import {BaseComponent} from '../../providers/BaseComponent';

@Component({
  selector: 'app-card-item',
  imports: [MatCardModule, NgTemplateOutlet],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss'
})
export class CardItemComponent extends BaseComponent{
  readonly href = input<string>("");
}
