import { ProductoComanda } from "./producto-comanda.interface";

export interface Reserva {
    uid?: string;
    uidEstablecimiento?: string;
    nombreEstablecimiento?: string;
    telefonoUsuario?: string;
    fotoEstablecimiento?: string;
    uidusuarios?: string[];
    usuarios?: any[];
    nombreUsuario?: string;
    fotoUsuario?: string;
    fecha?: Date;
    hora?: string;
    fechaString?: string;
    lesstime?: boolean;
    //hora?: string;
    duracion?: number;
    estado?: string;
    observaciones?: string;
    comensales?: number;
    fechaAlta?: Date;
    fechaConfirmada?: Date /*  */;
    fechaAsignada?: Date;
    fechaCancelada?: Date;
    tipo?: string;
    fechaEnEstablecimiento?: Date;
    fechaCanceladaUsuario?: Date;
    productos?: ProductoComanda[];
    total?: number;
    oneSignalId?: string;
    cantidad?: number;
    saldo?: number;
    tronas?: number;
    carros?: number;
    minusvalido?: number;
    mesa?: any;
    localizacion?: any;
    importePagado?: number;
    confirmacionReserva?: boolean;
    fechaconfirmacionReserva?: Date;

    confirmacionPendiente?: boolean;
    usuarioEnEstablecimiento?: boolean;
    fechaUsuarioEnEstablecimiento?: Date;
    descuento?: number;
    servicioUid?: string;
}