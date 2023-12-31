import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Paciente } from './paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private baseUrl = 'http://localhost:8090/fika';

  constructor(private http: HttpClient) { }

  /* agregarPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.baseUrl}/paciente`, paciente).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 409) {
          // Mostrar un mensaje de error en el formulario
          return throwError("El Paciente ya existen");
        } else {
          return throwError("Otro tipo de error en el registro de Paciente");
        }
      })
    );
  } */

  agregarPaciente(usuarioId: number, paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.baseUrl}/paciente/${usuarioId}`, paciente)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 409) {
            // Manejar el error de paciente existente
            throw new Error("El paciente ya existe");
          } else {
            // Manejar otros tipos de errores
            throw new Error("Otro tipo de error en el registro del paciente");
          }
        })
      );
  }
}
