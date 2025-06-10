import { ProductoOpcionOpcion } from "./producto-opcion-opcion.interface";

export interface ProductoOpcion {
    titulo?: string;
    minimo?: number;
    maximo?: number;
    obligatoria?: boolean;
    opciones?: ProductoOpcionOpcion[];
    resumen?: string;
    sel?: string;
}