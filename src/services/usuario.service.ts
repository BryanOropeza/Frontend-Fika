import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  /* currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({ codigo: 0, user: '', rol_id: {} }); */

  private baseUrl = 'http://localhost:8090/fika/usuario';
  constructor(private http: HttpClient) { }

  registrarUsuario(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 409) {
          // Mostrar un mensaje de error en el formulario
          return throwError("El usuario o correo ya existen");
        } else {
          return throwError("Otro tipo de error en el registro");
        }
      })
    );
  }

  checkUserExists(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/checkUser/${username}`);
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/checkEmail/${email}`);
  }

  /*   get userData(): Observable<User> {
      return this.currentUserData.asObservable();
    } */
}
