import { Categoria } from "./categoria.interface";
import { Horario } from "./horario.interface";
import { Traduccion } from "./traduccion.interface";
import { UtensilioDetalle } from "./utensilio-detalle.interface";
import { Valoracion } from "./valoracion.interface";

export interface Establecimiento {
    uid?: string;
    email?: string;
    nombre?: string;
    foto?: string;
    fotos?: string[];
    //logo?: string;
    activo?: boolean;
    croquis?: string;
    permitePush?: boolean;
    permiteEmail?: boolean;
    estado?: string;
    cantidadEnvioGratuito?: number;
    prefijoFactura?: string;
    latitud?: number;
    longitud?: number;
    ultimaConexion?: Date;
    conectado?: boolean;
    telefono?: string;
    pushToken?: string;
    pushuserId?: string;
    impresoraId?: string;
    impresoraNombre?: string;
    direccion?: string;
    descripcion?: string;
    tags?: string[];
    valoraciones?: Valoracion[];
    aceptarMesaAutomatica?: boolean;
    incidencias?: number;
    //
    duracionReserva?: number;
    precioComensalComida?: number;
    horario?: Horario[];
    horarioCocina?: Horario[];
    horarioReserva?: Horario[];
    horarioPedidos?: Horario[];
    prefijoReserva?: string;
    horarioPedido?: Horario[];
    tipo?: string;
    tipologia?: string;
    utiles?: UtensilioDetalle[];
    carta?: Categoria[];
    votacionServicio?: number;
    votacionServicioSumatorio?: number;
    turno?: number;
    turnoAbierto?: boolean;
    //para el impreso:
    razonsocial?: string;
    cif?: string;
    lineaCabeceraTicket?: string;
    lineaPieTicket?: string;
    web?: string;
    facebook?: string;
    instagram?: string;
    aseosDescripcion?: Traduccion[];
    aseos?: any;
    aseosFotos?: string[];
    aseosPermitirIncidencia?: boolean;
    //datos para reservas
    permiteReservar?: boolean;
    intervaloReserva?: number;
    horasReserva?: string[];
    pagocomensalreserva?: number;
    anticipoBizum?: boolean;
    diasReserva?: number;
    importeMinimoReserva?: number;
    numeroMaximoComensalesReserva?: number;
    envioComandaLessTime?: boolean;
    precioComensalComidaIva?: string;
    precioComensalComidaPorcentajeIva?: number;

    descripcionPrecioComensal?: Traduccion[];
    pagoTotalReserva?: boolean;
    horarioBarra?: Horario[];
    minutosAvisoBarra?: number;
    minutosAvisoCocina?: number;
    minutosAvisoCierre?: number;
    diasEspeciales?: any[];
    permiteOrdenarComanda?: boolean;
    opcionesPedido?: string[];
    //datos para pedidos
    envioADomicilio?: boolean;
    recogerEnEstablecimiento?: boolean;
    aceptaPedidos?: boolean;
    gastosEnvio?: number;
    tiempoEnvio?: string;
    tiempoRecoger?: string;
    importeMinimoPedido?: number;
    pagoAnticipado?: boolean;
    //datos de pago
    /*  pagoEfectivo?: boolean;
       pagoTarjeta?: boolean;
       pagoAplicacion?: boolean;
       pagoCheques?: boolean;
       pagoBizum?: boolean; */
    tiposPago?: string[];
    // telefonoBizum?: string;
    importeMinimoPagoTarjetaLocal?: number;
    /* importeMinimoPagoAplicacion?: number;
      importeMinimoPagoPaypal?: number;
      pagoPaypal?: boolean;
   */
    //opciones?:any;
    /* minutosAvisoCierre */
    //Opciones
    opcionesEstablecimiento?: string[];
    // wifi?: boolean;
    redwifi?: string;
    passwordwifi?: string;
    /*  chimenea?: boolean;
       television?: boolean;
       deporte?: boolean; */
    descripcionMusica?: Traduccion[];
    descripcionDeporte?: Traduccion[];
    codigoaseo?: boolean;
    /* musica?: boolean;
      aticoterraza?: boolean;
      terraza?: boolean;
     
      minusvalido?: boolean;
      localclimatizado?: boolean;
      parking?: boolean;
      tragaperras?: boolean;
      futbolin?: boolean;
      billar?: boolean;
      diana?: boolean;
      recreativas?: boolean;
      zonainfantil?: boolean;
      mascotas?: boolean;
      guardarropa?: boolean; */
}