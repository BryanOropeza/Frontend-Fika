import { Rol } from "./rol";

export interface User {
    codigo?: number;
    user: string;
    email?: string;
    password?: string;
    estate?: string;
    rol_id: Rol | 0;
}