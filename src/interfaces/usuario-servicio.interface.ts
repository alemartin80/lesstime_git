import { Pago } from "./pago.interface";

export interface UsuarioServicio {
    uid?: string;
    nombre?: string;
    foto?: string;
    activo?: boolean;
    invitadoPor?: string;
    invitadoNombre?: string;
    estaInvitado?: boolean;
    alergenos?: string[];
    haSalido?: boolean;
    pagos?: Pago[];
    pagado?: number;
}