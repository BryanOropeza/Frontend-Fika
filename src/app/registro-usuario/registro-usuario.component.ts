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
  rol: Rol = {
    codigo: 0,
    nombre: '',
    estado: ''
  };
  usuario: User = {
    codigo: 0,
    user: '', // Incluye un valor inicial para user
    email: '',
    password: '',
    estate: 'Activo',
    rol_id: {
      codigo: 0,
      nombre: '',
      estado: ''
    }
  };
  userExists = false;
  emailExists = false;

  passwordError = {
    lengthError: false,
    commonPasswordError: false,
    anyError: false,
    specialCaractersError: false,
    upperCaseError: false,
    errorMessages: {
      lengthErrorMessage: 'La contraseña debe tener al menos 8 caracteres',
      commonPasswordErrorMessage: 'La contraseña no puede ser común',
      specialCaractersErrorMessage: 'Caracteres no válidos',
      upperCaseErrorMessage: 'La contraseña debe tener al menos una Letra Mayúscula'
    }
  };

  commonPasswords = [
    'password', '12345678', 'qwerty', '123456', '123456789', '1234567', 'password1', '12345', '1234567890',
    '123123', '000000', 'iloveyou', '1234', '1q2w3e4r', 'qwertyuiop', '123', 'monkey', '123321', '654321',
    'qwerty123', 'letmein', '123456789', 'superman', 'batman', 'trustno1', 'abc123', 'password123', 'welcome',
    'admin', 'passw0rd', 'login', 'hello', 'master', 'summer', 'baseball', 'football', 'welcome1', 'password!',
    '123qwe', '123abc', 'sunshine', 'princess', 'dragon', 'flower', 'login123', 'admin123', 'pass123', 'test123',
    'test', 'password1!', 'welcome123', 'pass123!', 'passw0rd!', 'pass', 'abc', 'password12', '1234qwer', 'qwerty123!',
    '12345!', 'password123!', 'password!', 'iloveyou1', 'welcome@123', 'letmein1', 'admin@123', '1234abcd', 'iloveyou123',
    'changeme', 'pass@123', 'abcd1234', '123abc!', 'admin123!', '123456789a', '123456a', 'qazwsx', 'adminadmin', '12345qwert'
    // Puedes añadir más contraseñas comunes aquí
  ];

  specialCaracters = ['ó', '.', '|', '°', '=', '*', '<', '>', '[', ']', '©', '¶', '"', '#', '+'];




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

  validatePassword(password: string): void {
    // Validar longitud mínima
    this.passwordError.lengthError = password.length < 8;

    // Validar contraseña común
    this.passwordError.commonPasswordError = this.commonPasswords.includes(password.toLowerCase());

    // Verificar caracteres especiales
    const containsSpecialCharacter = this.specialCaracters.some(char => password.includes(char));
    this.passwordError.specialCaractersError = containsSpecialCharacter;

    //Validar si tiene al menos una mayúscula
    const uppercaseRegex = /[A-Z]/;
    this.passwordError.upperCaseError = !uppercaseRegex.test(password);

    // Unificar los errores para mostrar un mensaje general
    this.passwordError.anyError = this.passwordError.lengthError || this.passwordError.commonPasswordError || this.passwordError.specialCaractersError;
  }



  registrarUsuario() {
    if (this.usuario.password != '' && this.usuario.user != '' && this.usuario.password != '' && !this.passwordError.anyError) {
      this.usuarioService.registrarUsuario(this.usuario).subscribe(response => {
        console.log('Usuario registrado con éxito', response);
        Swal.fire('¡Registro Exitoso!', 'Usuario Registrado Correctamente', 'success');
        this.router.navigateByUrl('');
      }, error => {
        console.error('Error al registrar usuario', error);
        this.registrationError = "Hubo un error al Registrar el usuario.";
      });
    } else {
      this.registrationError = "Complete el formulario correctamente.";
    }
  }



}