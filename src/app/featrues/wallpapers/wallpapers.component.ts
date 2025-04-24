import {Component, inject, OnInit, Signal, signal} from '@angular/core';
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {InfiniteScrollDirective} from 'ngx-infinite-scroll';
import {WallpapersService} from './service/wallpapers.service';
import {MatCardModule} from '@angular/material/card';
import {BaseComponent} from '../../core/providers/BaseComponent';

@Component({
  selector: 'app-wallpapers',
  imports: [
    NgForOf,
    InfiniteScrollDirective,
    MatCardModule
  ],
  templateUrl: './wallpapers.component.html',
  styleUrl: './wallpapers.component.scss'
})
export class WallpapersComponent extends BaseComponent {

  page = 1;
  imageUrls: string[] = [];
  private isLoading = false;

  private readonly wallpapersService = inject(WallpapersService);


  override ngOnInit(): void {
    this.safeSubscribe("wallpapersObservable", this.wallpapersService.wallpapersObservable.pipe(), {
      next: urls => {
        console.info(`Componetnt:${urls.length}`);
        this.imageUrls = urls
        this.isLoading = false;
      }
    })
    this.loadData();
  }


  loadData() {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.wallpapersService.loadData(this.page);
    this.page++;
  }
}
