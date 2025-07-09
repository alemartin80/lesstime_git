import { ProductoComanda } from "./producto-comanda.interface";
export interface Comanda {
    uid?: string;
    estado?: string;
    enviadaCocina?: Date;
    fechaFin?: Date;
    precio?: number;
    cantidad?: number;
    total?: number;
    observaciones?: string;
    productos?: ProductoComanda[];
    productosAgrupados?: ProductoComanda[];
    uidUsuario?: string;
    nombreUsuario?: string;
    numeroComanda?: number;
    qr?: string;
    origen?: string;
}
