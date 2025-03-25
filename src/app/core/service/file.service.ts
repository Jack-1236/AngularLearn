import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private readonly httpClient = inject(HttpClient);

  loadFile(filePath: string): Observable<string> {
    return this.httpClient.get(filePath, { responseType: 'text' });
  }
}
