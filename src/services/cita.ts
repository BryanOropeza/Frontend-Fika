import { Paciente } from "./paciente";

export interface Cita {
    codigo: number,
    fechahora: Date,
    tratamiento: string,
    estado: string,
    pacienteid?: Paciente,
    observaciones?: string,
    editable?: boolean
}