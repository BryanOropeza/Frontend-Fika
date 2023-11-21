import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Cita } from './cita';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private baseURL = 'http://localhost:8090/fika'

  constructor(private http: HttpClient) { }

  getCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.baseURL}/citas`);
  }

  agregarCita(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(`${this.baseURL}/citas`, cita).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 409) {
          // Mostrar un mensaje de error en el formulario
          return throwError("La cita ya existen");
        } else {
          return throwError("Otro tipo de error en el registro de Cita");
        }
      })
    );
  }

  eliminarCita(id: number): Observable<Cita> {
    return this.http.delete<Cita>(`${this.baseURL}/citas/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError("Error al eliminar la cita");
      })
    );
  }

  actualizarCita(id: number, cita: Cita): Observable<Cita> {
    return this.http.put<Cita>(`${this.baseURL}/citas/${id}`, cita).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError("Error al actualizar la cita");
      })
    );
  }

  checkDateExists(date: Date): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseURL}/citas/checkDate/${date}`);
  }
}
