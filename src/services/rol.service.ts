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

  addRol(rol: Rol): Observable<Rol> {
    return this.http.post<Rol>(`${this.baseURL}/rol`, rol);
  }

  updateRol(id: number, rol: Rol): Observable<Rol> {
    return this.http.put<Rol>(`${this.baseURL}/rol/${id}`, rol);
  }

  deleteRol(id: number): Observable<Rol> {
    return this.http.delete<Rol>(`${this.baseURL}/rol/${id}`);
  }
}
