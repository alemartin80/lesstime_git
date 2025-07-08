export interface Mesa {
    uid?: string;
    nombre?: string;
    disponible?: boolean;
    numeroComensales?: number;
    numeroMinimoComensales?: number;
    permiteReserva?: boolean;
    localizacion?: string;
    qr?: string;
    width?: number;
    height?: number;
    top?: number;
    left?: number;
}
