import { Establecimiento } from '../interfaces/establecimiento.interface';
import { Mesa } from '../interfaces/mesa.interface';
import { Servicio } from '../interfaces/servicio.interface';
import { UsuarioServicio } from '../interfaces/usuario-servicio.interface';
import { Reserva } from '../interfaces/reserva.interface';
import { ProductoComanda } from '../interfaces/producto-comanda.interface';
export declare function crearServicio(firestore: any, coleccion: string, establecimiento: Establecimiento, tipo: string, mesa: Mesa, nombreServicio: string, comensales: number, usuarioInput: any, reserva?: Reserva): Servicio;
export declare function enviarComanda(firestore: any, coleccion: string, servicio: Servicio, productos: ProductoComanda[], observaciones: string, usuario: UsuarioServicio): void;
