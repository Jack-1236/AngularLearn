import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WallpapersService {
  private readonly http = inject(HttpClient);
  private readonly wallpapersSubject = new BehaviorSubject<string[]>([]);
  wallpapersObservable: Observable<string[]> = this.wallpapersSubject.asObservable();

  constructor() {

  }

  loadData(page: number) {
    this.http.get(`/api/wallhaven/search?sorting=toplist&page=${page}`).subscribe({
      next: (res: any) => {

        const images: string[] = res.data.map((item: any) => item.path);
        console.info(`接收到数据:${images}`);
        this.wallpapersSubject.next(images);
      },
      error: err => console.error(err)
    });
  }


}


