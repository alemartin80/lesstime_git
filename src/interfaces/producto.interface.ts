import { Alergeno } from "./alergeno.interface";
import { Foto } from "./foto.interface";
import { Traduccion } from "./traduccion.interface";

export interface Producto {
  utiles?: any[];
  uid?: string;
  //nombre?: string;
  nombre?: Traduccion[];
  descripcion?: Traduccion[];
  precio?: number;
  cocina?: boolean;
  // categoria?: string;
  uidcategoria?: string;
  orden?: number;
  nombreInterno?: string;
  tipo?: string;
  textoObligatorio?: boolean;
  fotos?: Foto[];
  alergenos?: Alergeno[];
  opciones?: any[];
  tamanyos?: any[];
  precioVariable?: boolean;
  tieneOpcion?: boolean;
  tieneTamanyo?: boolean;
  tieneFotos?: boolean;
  activo?: boolean;
  tieneAlcohol?: boolean;
  tiempoPreparacion?: string;
  fueraDeCarta?: boolean;
  sugerencia?: boolean;
  antelacion?: boolean;
  cantidadMinima?: number;
  agotado?: boolean;
  iva?: string;
  porcentajeiva?: number;
  novedad?: boolean;
  topVenta?: boolean;
}