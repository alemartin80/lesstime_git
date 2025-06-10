import { Producto } from "./producto.interface";
import { Traduccion } from "./traduccion.interface";
export interface Categoria {
    uid?: string;
    nombre?: Traduccion[];
    orden?: number;
    productos?: Producto[];
    foto?: string;
    visible?: boolean;
}
