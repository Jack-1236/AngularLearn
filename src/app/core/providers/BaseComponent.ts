import {DestroyRef, inject, Injectable, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {VERSION} from '@angular/core';
import 'reflect-metadata';

interface ObserverObject<T> {
  next?: (value: T) => void;
  error?: (error: any) => void;
  complete?: () => void;
}

@Injectable()
export abstract class BaseComponent implements OnDestroy, OnInit {

  private readonly destroyRef = inject(DestroyRef);

  private subscriptions = new Map<string, Subscription[]>();

  private add(tag: string, subscription: Subscription): void {
    if (!this.subscriptions.has(tag)) {
      this.subscriptions.set(tag, []);
    }

    this.subscriptions.get(tag)?.push(subscription);
  }


  safeSubscribe<T>(
    tag: string,
    obs$: Observable<T>,
    callBack: ObserverObject<T>
  ): void {

    console.info('Component:', this.constructor.name, '|', 'SafeSubscribe:', tag);
    const final$ = parseInt(VERSION.major) >= 16 ?
      (console.info('当前 Angular 版本是：', VERSION.full, '启动组件销毁时注销订阅'),
        obs$.pipe(takeUntilDestroyed(this.destroyRef))) : obs$

    const sub = final$.subscribe(callBack);

    if (parseInt(VERSION.major) <= 16) {
      this.add(tag, sub);
      console.info('当前 Angular 版本是：', VERSION.full, '使用OnDestroy注销订阅');
    }

  }


  ngOnDestroy(): void {
    if (parseInt(VERSION.major) <= 16) {
      this.subscriptions.forEach(subs => {
        subs.forEach(s => s.unsubscribe());
      });
      this.subscriptions.clear();
    }
  }

  ngOnInit(): void {

  }

}
