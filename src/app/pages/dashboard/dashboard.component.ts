import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { endOfDay, startOfDay } from 'date-fns';
import { Cita } from 'src/services/cita';
import { ReservaService } from 'src/services/reserva.service';
import { Rol } from 'src/services/rol';
import { RolService } from 'src/services/rol.service';
import Swal from 'sweetalert2';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], filtroCodigo: string, filtroTratamiento: string): any[] {
    if (!items) {
      return [];
    }

    if (!filtroCodigo && !filtroTratamiento) {
      return items;
    }

    return items.filter((item) => {
      let codigoMatch = false;
      let tratamientoMatch = false;

      if (typeof item.codigo === 'string') {
        codigoMatch = item.codigo.toLowerCase().includes(filtroCodigo.toLowerCase());
      } else if (typeof item.codigo === 'number') {
        codigoMatch = item.codigo.toString().includes(filtroCodigo);
      }

      if (typeof item.tratamiento === 'string') {
        tratamientoMatch = item.tratamiento.toLowerCase().includes(filtroTratamiento.toLowerCase());
      }

      return (filtroCodigo ? codigoMatch : true) && (filtroTratamiento ? tratamientoMatch : true);
    });
  }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  citas: Cita[] = [];
  weeks: any[] = [];
  filtroCodigo: string = ''; // Agrega filtroCodigo
  filtroTratamiento: string = ''; // Agrega filtroTratamiento
  cita: Cita = {
    codigo: 0,
    fechahora: new Date(),
    tratamiento: '',
    estado: 'Activo',
    pacienteid: {},
    observaciones: '',
    editable: false
  }

  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  ////rol
  rol: Rol = {
    codigo: 0,
    nombre: '',
    estado: ''
  }
  roles: Rol[] = [];

  constructor(private reservaService: ReservaService, private rolService: RolService) { }

  ngOnInit(): void {
    this.getCitasReservadas();
    this.getRolesEncontrados();
  }

  getRolesEncontrados() {
    this.rolService.getRoles().subscribe(
      (roles: Rol[]) => {
        this.roles = roles;
      }
    )
  }

  agregarRol() {
    this.rolService.addRol(this.rol).subscribe(
      (rolAgregado: Rol) => {
        console.log('Rol agregado:', rolAgregado);
        // Actualizar la lista de roles o realizar otras acciones necesarias
      },
      (error) => {
        console.error('Error al agregar el Rol:', error);
        // Manejo del error
      }
    );
  }

  actualizarRol(rol: Rol) {
    this.rolService.updateRol(rol.codigo, rol).subscribe(
      (rolActualizado: Rol) => {
        console.log('Rol actualizado:', rolActualizado);
        // Actualizar la lista de roles o realizar otras acciones necesarias
      },
      (error) => {
        console.error('Error al actualizar el Rol:', error);
        // Manejo del error
      }
    );
  }

  eliminarRol(id: number) {
    this.rolService.deleteRol(id).subscribe(
      () => {
        console.log('Rol eliminado con éxito');
        Swal.fire({
          title: 'Rol Eliminado!',
          html: 'Eliminación exitosa',
          icon: 'success'
        });

        // Actualizar la lista de roles o realizar otras acciones necesarias
      },
      (error) => {
        console.error('Error al eliminar el Rol:', error);
        // Manejo del error
      }
    );
  }

  getCitasReservadas() {
    this.reservaService.getCitas().subscribe(
      (citas: Cita[]) => {
        this.citas = citas;
        this.generateCalendar();
      }
    )
  }

  generateCalendar() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const weeks: any[] = [];
    let week: any[] = [];

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startDay = firstDayOfMonth.getDay();

    let dayCount = 1;

    for (let i = 0; i < 6; i++) {
      week = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < startDay) || dayCount > daysInMonth) {
          week.push(null);
        } else {
          week.push(dayCount);
          dayCount++;
        }
      }
      weeks.push(week);
      if (dayCount > daysInMonth) {
        break;
      }
    }

    this.weeks = weeks;
  }

  getCitasForDay(day: number) {
    const citasForDay = this.citas.filter(cita => {
      const citaDay = new Date(cita.fechahora).getDate();
      return citaDay === day;
    });
    return citasForDay;
  }



  toggleEdicion(cita: Cita) {
    cita.editable = !cita.editable;
    if (!cita.editable) {
      // Si se cancela la edición, restaura los datos originales
      this.actualizarCita(cita);
    }
  }

  toggleEdicionRol(rol: Rol) {
    rol.editable = !rol.editable;
    if (!rol.editable) {
      // Si se cancela la edición, restaura los datos originales
      this.actualizarRol(rol);
    }
  }

  actualizarCita(cita: Cita) {
    this.reservaService.actualizarCita(cita.codigo, cita).subscribe(
      (citaActualizada: Cita) => {
        // Manejo de la cita actualizada
        console.log('Cita actualizada:', citaActualizada);
        // Puedes actualizar la lista de citas o realizar otras acciones necesarias
      },
      (error) => {
        console.error('Error al actualizar la cita:', error);
        // Manejo del error
      }
    );
  }

  // Método para eliminar una cita
  eliminarCita(id: number) {
    this.reservaService.eliminarCita(id).subscribe(
      (citaEliminada: Cita) => {
        // Manejo de la cita eliminada
        console.log('Cita eliminada:', citaEliminada);
        Swal.fire({
          title: 'Cita Eliminada!',
          html: 'Eliminación exitosa',
          icon: 'success'
        });
        // Puedes actualizar la lista de citas o realizar otras acciones necesarias
      },
      (error) => {
        console.error('Error al eliminar la cita:', error);
        // Manejo del error
      }
    );
  }
}
