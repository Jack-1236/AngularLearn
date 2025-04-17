import {Component, inject, OnInit, signal} from '@angular/core';
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {InfiniteScrollDirective} from 'ngx-infinite-scroll';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-wallpapers',
  imports: [
    NgForOf,
    NgOptimizedImage,
    InfiniteScrollDirective
  ],
  templateUrl: './wallpapers.component.html',
  styleUrl: './wallpapers.component.scss'
})
export class WallpapersComponent implements OnInit {

  page = 1;
  readonly imageUrls = signal([])
  scrollDistance = 1;//滚到到多少距离时触发加载
  scrollUpDistance = 2;//向上滚到时加载更多
  throttle = 300;//防止多次触发滚动事件

  private isLoading = false;
  private readonly http = inject(HttpClient)

  ngOnInit(): void {

  }


  loadData() {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
  }

}
