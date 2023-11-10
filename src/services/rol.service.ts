import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Rol } from './rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private baseURL = 'http://localhost:8090/fika';
  constructor(private http: HttpClient) { }

  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/rol`);
  }

  getRol(): Observable<Rol> {
    return this.http.get<Rol>(`${this.baseURL}/rol/1`);
  }
}
