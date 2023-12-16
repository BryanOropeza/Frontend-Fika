import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Restablecer } from 'src/services/restablecer';
import { UsuarioService } from 'src/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {

  usuario: Restablecer = {
    user: '',
    password: ''
  };

  reservaError: string = '';

  //MENSAJES DE ERROR DE PASSWORD
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

  //VALIDACIONES DE PASSWORD COMUNES
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

  //CARACTERES ESPECIALES NO VALIDOS
  specialCaracters = ['ó', '.', '|', '°', '=', '*', '<', '>', '[', ']', '©', '¶', '"', '#', '+'];

  constructor(private usuarioService: UsuarioService, private router: Router) { }

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

  resetearPassword() {
    if (this.usuario.user && this.usuario.password && !this.passwordError.anyError) {
      this.usuarioService.resetPassword(this.usuario.user, this.usuario.password).subscribe(
        response => {
          // Maneja la respuesta si el restablecimiento de contraseña fue exitoso
          console.log('Contraseña restablecida correctamente');
          Swal.fire({
            title: 'Restablecimiento Exitoso!',
            text: 'Ya puedes iniciar sesion con tu nueva contraseña',
            icon: 'success'
          });
          this.router.navigateByUrl('/');
          // Podrías redirigir al usuario a otra página o mostrar un mensaje de éxito
        },
        error => {
          // Maneja el error si falla el restablecimiento de contraseña
          console.error('Error al restablecer la contraseña', error);
          this.reservaError = 'Hubo un error al restablecer la contraseña';
        }
      );
    } else {
      this.reservaError = 'Por favor, complete todos los campos';
    }
  }
}