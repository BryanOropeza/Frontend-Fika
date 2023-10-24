import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CitaService } from 'src/services/cita.service';
import { PacienteService } from 'src/services/paciente.service';
import { UsuarioService } from 'src/services/usuario.service';
import { RolService } from 'src/services/rol.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend_fika';

  constructor(
    public fb: FormBuilder,

  ) {

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
