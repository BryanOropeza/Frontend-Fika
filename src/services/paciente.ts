import { User } from "./user";

export interface Paciente {
    codigo?: number,
    dni?: string,
    nombre?: string,
    apellido?: string,
    direccion?: string,
    telefono?: string,
    fechanacimiento?: string,
    estado?: string,
    sexo?: string,
    observaciones?: string,
    usuario: User
}