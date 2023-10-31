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
  registrationForm = this.formBuilder.group({
    user: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    rol_id: [0, Validators.required] // Puedes ajustar el valor según tu necesidad
  });

  constructor(
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private formBuilder: FormBuilder,
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
  }

  get user() {
    return this.registrationForm.controls.user;
  }

  get password() {
    return this.registrationForm.controls.password;
  }

  get rol_id() {
    return this.registrationForm.controls.rol_id;
  }

  get email() {
    return this.registrationForm.controls.email;
  }



  registrarUsuario() {
    if (this.registrationForm.valid) {
      this.registrationError = "";

      const selectedRol = this.roles.find((rol) => rol.codigo === this.registrationForm.value.rol_id);

      if (selectedRol) {
        const user: User = {
          user: this.registrationForm.value.user || '',
          email: this.registrationForm.value.email || '',
          password: this.registrationForm.value.password || '',
          rol_id: selectedRol // Asigna el objeto RolEntity completo
        };

        this.usuarioService.registrarUsuario(user).subscribe({
          next: (response: User) => {
            console.log('Usuario registrado con éxito', response);
            this.router.navigateByUrl('/inicio');
            // Aquí puedes manejar la respuesta, por ejemplo, redirigir a otra página.
          },
          error: (error) => {
            console.error('Error al registrar usuario', error);
            // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error.
          },
          complete: () => {
            console.info("Registro Completo");
            this.registrationForm.reset();
          }
        });
      } else {
        // El formulario no es válido, puedes mostrar un mensaje de error o realizar alguna otra acción.

        this.registrationForm.markAllAsTouched();
        this.registrationError = "Por favor, completa todos los campos correctamente.";
      }
    }
  }
}