import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = 'http://localhost:8090/fika/usuario';
  constructor(private http: HttpClient) { }

  registrarUsuario(usuario: any): Observable<any> {
    //Realizar solicitud POST al backend para registrar usuario
    return this.http.post(`${this.baseUrl}`, usuario);
  }
}
