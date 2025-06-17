import { UtensilioDetalle } from "./utensilio-detalle.interface";

export interface Utensilio{
    detalle?: UtensilioDetalle[];
    observaciones?: string;
    fechaInicio?: Date;
    fechaFin?: Date;
    atendido?: boolean;
    nombreUsuario?: string;
    uidUsuario?: string;
  }