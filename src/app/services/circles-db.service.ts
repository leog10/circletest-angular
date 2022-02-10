import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CirclesDbService {
  private apiUrl = 'http://localhost:3000/circles';

  constructor(
    private http: HttpClient
  ) { }

  getData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
