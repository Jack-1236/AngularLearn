import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal, Signal, viewChild} from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationSkipped,
  NavigationStart,
  Router
} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {filter, map, switchMap, take} from 'rxjs';
import {NgIf} from '@angular/common';

export const PROGRESS_BAR_DELAY = 30;

/**
 * 这个组件的作用的监听导航的开始和结束实现进度条的显示于隐藏*/
@Component({
  selector: 'app-progress-bar',
  imports: [MatProgressBarModule, NgIf],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  readonly isLoading = signal(true)

  ngOnInit(): void {
    this.setupPageNavigationDimming();
  }


  private setupPageNavigationDimming() {
    this.router.events
      .pipe(
        takeUntilDestroyed(this.destroyRef),//组件销毁时停止订阅
        filter((event) => event instanceof NavigationStart),//判断当前是导航开始的状态
        map(() => this.startProgressBarWithDelay()),//启动导航
        switchMap((timeoutId) => this.waitForNavigationEnd(timeoutId)),//等待导航结束并返回timeout的id
      ).subscribe(timeoutId => this.clearNavigationTimeout(timeoutId));//清除timeout并且设置进度条不可见

  }

  /**延迟启动进度条*/
  private startProgressBarWithDelay(): number {
    return setTimeout(() => {
      this.isLoading.set(true);
    }, PROGRESS_BAR_DELAY) as unknown as number;
  }

  /**
   * 等待导航结束
   * */
  private waitForNavigationEnd(timeoutId: number) {
    return this.router.events.pipe(
      filter((event) =>
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationSkipped ||
        event instanceof NavigationError),
      take(1),
      map(() => timeoutId));
  }

  /**
   * 清除导航超时*/
  private clearNavigationTimeout(timeoutId: number) {
    clearTimeout(timeoutId);
    this.isLoading.set(false);
  }
}
