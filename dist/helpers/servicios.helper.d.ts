import { Establecimiento } from '../interfaces/establecimiento.interface';
import { Mesa } from '../interfaces/mesa.interface';
import { Servicio } from '../interfaces/servicio.interface';
import { Reserva } from '../interfaces/reserva.interface';
export declare function modelarServicio(establecimiento: Establecimiento, tipo: string, mesa: Mesa, nombreServicio: string, comensales: number, usuarioInput: any, reserva?: Reserva): Servicio;
