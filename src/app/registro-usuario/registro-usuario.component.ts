import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RolService } from 'src/services/rol.service';
import { Rol } from 'src/services/rol';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/services/usuario.service';
import { User } from 'src/services/user';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {
  registrationError: String = "";
  roles: Rol[] = [];
  rol: Rol = {};
  usuario: User = {
    codigo: 0,
    user: '', // Incluye un valor inicial para user
    email: '',
    password: '',
    estate: 'Activo',
    rol_id: {}
  };


  constructor(
    private usuarioService: UsuarioService,
    private rolService: RolService,
    /* private formBuilder: FormBuilder,
    private router: Router */
  ) { }

  ngOnInit() {
    // Obtener la lista de roles al inicializar el componente
    this.rolService.getRoles().subscribe(
      (roles) => {
        this.roles = roles;
      },
      (error) => {
        console.error('Error al obtener la lista de roles', error);
      }
    );

    this.rolService.getRol().subscribe(
      (rol) => {
        this.usuario.rol_id = rol;
        console.log(rol);
      }
    )
  }

  registrarUsuario() {
    this.usuarioService.registrarUsuario(this.usuario).subscribe(response => {
      console.log('Usuario registrado con éxito', response);
      // Aquí puedes redirigir a otra página o mostrar un mensaje de éxito.
    }, error => {
      console.error('Error al registrar usuario', error);
      // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error.
    });
  }
}