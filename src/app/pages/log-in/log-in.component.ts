import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';
import { LoginRequest } from 'src/services/loginRequest';
import { User } from 'src/services/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LoginComponent implements OnInit {
  loginError: string = "";
  loginForm = this.formBuilder.group({
    user: ['', [Validators.required]],
    password: ['', Validators.required],
  })
  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  get user() {
    return this.loginForm.controls.user;
  }

  get password() {
    return this.loginForm.controls.password;
  }


  login() {
    if (this.loginForm.valid) {
      this.loginError = "";
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData: User) => {
          console.log(userData);
          Swal.fire('¡Inicio Exitoso!', 'Loggin correcto', 'success');

          const userId = userData.codigo;
          // Almacena el objeto completo de usuario en localStorage
          localStorage.setItem('currentUser', JSON.stringify(userData));
          // Realiza el redireccionamiento aquí después de un inicio de sesión exitoso
          this.router.navigateByUrl(`/dashboard/${userId}`);
          // También puedes almacenar la información del usuario en el servicio o en localStorage
          // para acceder a ella en otras partes de la aplicación.
        },
        error: (errorData) => {
          console.error(errorData);
          this.loginError = "Credenciales incorrectas"; // Mensaje de error personalizado
        },
        complete: () => {
          console.info("Login completo");
          this.loginForm.reset();
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
      this.loginError = "Error al ingresar los datos.";
    }
  }

}