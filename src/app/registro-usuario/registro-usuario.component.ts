import { Component, OnInit } from '@angular/core';
import { RolService } from 'src/services/rol.service';
import { UsuarioService } from 'src/services/usuario.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {
  usuario: any = {}; //Objeto para almacenar datos del formulario
  roles: any[] = [];
  constructor(
    private usuarioService: UsuarioService,
    private rolService: RolService
  ) { }

  ngOnInit() {
    // Obtener la lista de roles al inicializar el componente
    this.rolService.getRoles().subscribe(
      (roles) => {
        this.roles = roles;
        console.log('Roles obtenidos:', this.roles);
      },
      (error) => {
        console.error('Error al obtener la lista de roles', error);
      }
    );
  }

  submitForm() {
    this.usuarioService.registrarUsuario(this.usuario).subscribe(
      (response) => {
        console.log('Usuario Registrado Correctamente', response);

      },
      (error) => {
        console.error('Error al registar usuario', error);
      },
    );

  }
}
