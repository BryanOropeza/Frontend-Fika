import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cita } from 'src/services/cita';
import { Paciente } from 'src/services/paciente';
import { PacienteService } from 'src/services/paciente.service';
import { ReservaService } from 'src/services/reserva.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {
  reservaError: String = "";
  citas: Cita[] = [];
  paciente: Paciente = {
    codigo: 0,
    dni: '',
    nombre: '',
    apellido: '',
    direccion: '',
    telefono: '',
    fechanacimiento: '',
    estado: 'Activo',
    sexo: '',
    observaciones: ''
  };
  cita: Cita = {
    codigo: 0,
    fechahora: new Date(),
    tratamiento: '',
    estado: 'Activo',
    pacienteid: {},
    observaciones: ''
  }

  dateExists = false;
  dateOutOfTime = false;



  constructor(private reservaService: ReservaService, private pacienteService: PacienteService, private router: Router) { }


  ngOnInit() {
    this.reservaService.getCitas().subscribe(citas => {
      this.citas = citas;
      console.log("citas obtenidas ", citas);
    }, (error) => {
      console.error("Ocurrió un error: ", error);
    });
  }



  checkDateExists(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      const date = target.value;
      const formattedDate = formatDate(date, 'yyyy-MM-ddTHH:mm:ss', 'en-US');
      const dateObj = new Date(formattedDate);

      if (dateObj) {
        this.reservaService.checkDateExists(dateObj).subscribe(
          (exists: boolean) => {
            this.dateExists = exists;
          }
        );
      }
    }
  }

  checkDateOutTime(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      const date = target.value;
      const formattedDate = formatDate(date, 'yyyy-MM-ddTHH:mm:ss', 'en-US');
      const dateobj = new Date(formattedDate);

      if (dateobj) {
        this.reservaService.isDateOutOfTime(dateobj).subscribe(
          (exists: boolean) => {
            this.dateOutOfTime = exists;
          }
        )
      }
    }
  }


  agregarReserva() {

    const formattedDate = formatDate(this.cita.fechahora, 'yyyy-MM-ddTHH:mm:ss', 'en-US');

    // Convertir la fecha formateada a tipo Date
    const dateObj = new Date(formattedDate);
    if (!isNaN(dateObj.getTime())) {
      // Asignar la fecha convertida a la propiedad fechahora de la cita
      this.cita.fechahora = dateObj;
    }

    Swal.fire({
      title: '¿Estás seguro de reservar la cita?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, reservar'
    }).then((result) => {
      if (result.isConfirmed) {

        // Aquí va la lógica para agregar la reserva si se confirma
        this.pacienteService.agregarPaciente(this.paciente).subscribe((pacienteCreado: Paciente) => {


          this.cita.pacienteid = {
            codigo: pacienteCreado.codigo,
            dni: pacienteCreado.dni,
            nombre: pacienteCreado.nombre,
            apellido: pacienteCreado.apellido,
            direccion: pacienteCreado.direccion,
            telefono: pacienteCreado.telefono,
            fechanacimiento: pacienteCreado.fechanacimiento,
            estado: 'Activo',
            sexo: pacienteCreado.sexo,
            observaciones: pacienteCreado.observaciones
            // Resto de los atributos del paciente

          };


          this.reservaService.agregarCita(this.cita).subscribe(response => {

            console.log('Cita registrada con éxito', response);

            const fechaCita = this.cita.fechahora;

            const nombreCita = this.cita.tratamiento;
            const detalle = this.cita.estado;

            const mensaje = `<div><b>Fecha de la cita:</b> ${fechaCita}</div>
                            <div><b>Tratamiento:</b> ${nombreCita}</div>`;

            Swal.fire({
              title: '¡Registro Exitoso!',
              html: mensaje,
              icon: 'success'
            });
            this.router.navigateByUrl('/');
          }, error => {
            console.error('Error al registrar la Cita', error);
            this.reservaError = "Hubo un error al Registrar la reserva.";
          });
        }, error => {
          console.error('Error al registrar paciente', error);
          this.reservaError = "Hubo un error al Registrar al Paciente.";
        });
      }
    });
  }
}



