import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WallpapersService {
//https://wallhaven.cc/toplist?page=14

  private readonly http = inject(HttpClient);

  private readonly wallpapersSubject = new BehaviorSubject<string[]>([]);
wallpapersObservable:Observable<string[]>=this.wallpapersSubject.asObservable();

  constructor() {
  }

  loadData(page:number){
  this.http.get(`https://wallhaven.cc/toplist?page=${page}`).subscribe(response=>{



  });


  }



}
