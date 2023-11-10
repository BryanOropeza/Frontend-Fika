import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RolService } from 'src/services/rol.service';
import { Rol } from 'src/services/rol';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/services/usuario.service';
import { User } from 'src/services/user';
import Swal from 'sweetalert2';

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
  userExists = false;
  emailExists = false;


  constructor(
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private router: Router
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

  checkUserExists(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      const user = target.value;
      if (user) {
        this.usuarioService.checkUserExists(user).subscribe(
          (exists: boolean) => {
            this.userExists = exists;
          }
        );
      }
    }
  }

  checkEmailExists(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      const email = target.value;
      if (email) {
        this.usuarioService.checkEmailExists(email).subscribe(
          (exists: boolean) => {
            this.emailExists = exists;
          }
        );
      }
    }
  }

  registrarUsuario() {
    if (this.usuario.password != '' && this.usuario.user != '' && this.usuario.password != '') {
      this.usuarioService.registrarUsuario(this.usuario).subscribe(response => {
        console.log('Usuario registrado con éxito', response);
        Swal.fire('¡Registro Exitoso!', 'Usuario Registrado Correctamente', 'success');
        this.router.navigateByUrl('/inicio-login');
      }, error => {
        console.error('Error al registrar usuario', error);
        this.registrationError = "Hubo un error al Registrar el usuario.";
      });
    } else {
      this.registrationError = "Complete el formulario correctamente.";
    }
  }

}