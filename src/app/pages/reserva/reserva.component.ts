import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cita } from 'src/services/cita';
import { Paciente } from 'src/services/paciente';
import { PacienteService } from 'src/services/paciente.service';
import { ReservaService } from 'src/services/reserva.service';
import { Rol } from 'src/services/rol';
import { RolService } from 'src/services/rol.service';
import { User } from 'src/services/user';
import { UsuarioService } from 'src/services/usuario.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {
  //--------------------------- VARIABLES DE REGISTRO DE USUARIO -----------------------------------
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

  //VALIDACIONES DE USUARIO E EMAIL
  userExists = false;
  emailExists = false;

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

  //--------------------------- VARIABLES DE PACIENTE-----------------------------------------------

  //--------------------------- VARIABLES DE RESERVA -----------------------------------------------
  //Mensaje de Error Reserva
  reservaError: String = "";
  citas: Cita[] = [];

  //Estructura de Paciente
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
    observaciones: '',
    usuario: {
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
    }
  };

  usuarioRol: Rol = {
    codigo: 2,
    nombre: 'Admin',
    estado: 'Activo'
  };
  //Estructura de Cita
  cita: Cita = {
    codigo: 0,
    fechahora: new Date(),
    tratamiento: '',
    estado: 'Activo',
    pacienteid: {
      codigo: 0,
      dni: '',
      nombre: '',
      apellido: '',
      direccion: '',
      telefono: '',
      fechanacimiento: '',
      estado: 'Activo',
      sexo: '',
      observaciones: '',
      usuario: {
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
      }
    },
    observaciones: ''
  }

  //Validaciones de Fecha
  dateExists = false;
  dateOutOfTime = false;

  //VARIABLE PARA MOSTRAR SECCIONES ESPECIFICAS DEL FORMULARIO
  pasoActual = 1;


  constructor(private reservaService: ReservaService, private pacienteService: PacienteService, private usuarioService: UsuarioService,
    private rolService: RolService, private router: Router, private http: HttpClient) { }


  ngOnInit() {
    //APARTADO DE REGISTRO DE USUARIO
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
    //APARTADO DE PACIENTE

    //APARTADO DE RESERVA
    this.reservaService.getCitas().subscribe(citas => {
      this.citas = citas;
      console.log("citas obtenidas ", citas);
    }, (error) => {
      console.error("Ocurrió un error: ", error);
    });
  }

  //--------------------------METODOS DE REGISTRO DE USUARIO----------------------------------
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



  DatosUsuarioCompletados() {
    this.pasoActual = 2;
  }

  DatosPacienteCompletados() {
    this.pasoActual = 3;
  }
  //--------------------------------------------------------------------------------------------------
  //--------------------------------------METODOS DE PACIENTE-----------------------------------------
  //Método para agregar un paciente
  agregarPaciente() {
    if (this.paciente.usuario.codigo != null) {
      this.pacienteService.agregarPaciente(this.paciente.usuario.codigo, this.paciente).subscribe((pacienteCreado: Paciente) => {
        // Resto del código para manipular el paciente creado, si es necesario

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
          observaciones: pacienteCreado.observaciones,
          usuario: pacienteCreado.usuario
          // Resto de los atributos del paciente
        };

        console.log("Paciente Creado", pacienteCreado);
        //Una vez llenado los datos de paciente llamos al método reserva
        this.agregarReserva();

      }, error => {
        console.error('Error al registrar paciente', error);
      });
    } else {
      // Manejar el caso si no se tiene el ID del usuario
    }

  }

  agregarReserva() {
    //.................................AÑADIR RESERVA......................................//
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
  }


  //--------------------------------------METODOS DE RESERVA------------------------------------------
  DatosTotalesCompletos() {
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
        //...............................AÑADIENDO USUARIO y PACIENTE...........................................//
        if (this.usuario.password != '' && this.usuario.user != '' && this.usuario.password != '' && !this.passwordError.anyError) {
          this.usuarioService.registrarUsuario(this.usuario).subscribe((response: User) => {
            console.log('Usuario registrado con éxito', response);

            // Si 'response' incluye el ID del usuario, puedes utilizarlo para crear el paciente
            if (response && response.codigo) {
              // Asignar el ID del usuario al paciente
              this.paciente.usuario = response;
              this.paciente.dni = response.user;

              // Continuar con el proceso para crear el paciente
              this.agregarPaciente();
            } else {
              console.error('No se recibió el ID del usuario después de registrar');
              // Manejar el caso si no se recibe el ID del usuario
            }
          }, error => {
            console.error('Error al registrar usuario', error);
            this.registrationError = "Hubo un error al Registrar el usuario.";
          });

        } else {
          this.registrationError = "Complete el formulario correctamente.";
        }
      }
      this.enviarCorreo();
    });
  }

  //enviar correo
  enviarCorreo(): void {
    const datosReserva = {
      email: this.usuario.email, // Obtén el correo electrónico del usuario desde el formulario
      tratamiento: this.cita.tratamiento // Obtén el tipo de tratamiento desde el formulario
      // Agrega otras propiedades si las necesitas
    };
    this.http.post('../reserva/enviarCorreo.php', datosReserva)
      .subscribe((response) => {
        console.log('Respuesta del backend:', response);
        // Realiza acciones adicionales si es necesario
      }, (error) => {
        console.error('Error al enviar los datos al backend:', error);
        // Manejo de errores
      });
  }
}