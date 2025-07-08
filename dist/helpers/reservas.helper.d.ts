import { Establecimiento } from '../interfaces/establecimiento.interface';
import { Mesa } from '../interfaces/mesa.interface';
export declare function reservar(establecimiento: Establecimiento, comensales: number, mesas: Mesa[], localizaciones: any, horasDescuentos: any, reservas: any): {
    fechaFinal: Date;
    reservas: any;
    localizaciones: any;
    mesas: Mesa[];
    diasReserva: number;
    duracionReserva: number;
    disponible: {
        fecha: any;
        dia: any;
        diaC: string;
        ocupado: number;
        disponible: number;
        porcentajeOcupacion: number;
        mesasDisponibles: {
            intervalo: string;
            mesas: any[];
            descuento: number;
        }[];
        cerrado: boolean;
    }[];
};
