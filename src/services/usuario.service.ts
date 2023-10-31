import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({ codigo: 0, user: '', rol_id: {} });

  private baseUrl = 'http://localhost:8090/fika/usuario';
  constructor(private http: HttpClient) { }

  registrarUsuario(user: User) {
    return this.http.post<User>(this.baseUrl, user).pipe(
      catchError((error) => {
        console.error("Error en la solicitud de registro", error);
        // Aquí puedes manejar el error y proporcionar un mensaje más descriptivo.
        return throwError("Error en la solicitud de registro");
      })
    );
  }

  get userData(): Observable<User> {
    return this.currentUserData.asObservable();
  }
}
