import {Component, signal} from '@angular/core';
import {sign} from 'node:crypto';
import {NgForOf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-images',
  imports: [
    NgOptimizedImage,
    NgForOf
  ],
  templateUrl: './images.component.html',
  styleUrl: './images.component.scss'
})
export class ImagesComponent {
  readonly imageUrls = signal([])


}
