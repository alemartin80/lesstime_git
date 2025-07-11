

export interface Pago {
  impuestos?: any;
  impuestosTotal?: number;
  tipoPago?: string;
  cantidad?: number;
  saldo?: number;
  total?: number;
  uidUsuario?: string;
  fecha?: Date;
  validado?: boolean;
  tipoFactura?: string;
  uid?: string;
  url?: string;
  fechaValidacion?: Date;
  id?: string;
  uidEstablecimiento?: string;
  tipo?: string;
  status?: string;
  uidTipo?: string;
  origen?: string;
  turno?: number;
  lesstime?: boolean;
  propina?: number;
  prefijo?: string;
  numeroFactura?: number;
  procesado?: boolean;
  
  uuid?: string;
  items?: any;
  zz_fiskaly_enviado?: boolean;
  zz_fiskaly_url?: string;
  zz_fiskaly_text?: string;
  lineaCabeceraTicket?: string;
  lineaPieTicket?: string;
  urlStorage?: string;
  factura_establecimiento?: any;
  factura_cif?: string;

  factura_nombre?: string;
  factura_identificacion?: string;
  factura_domicilio?: string;
  factura_codigopostal?: string;
  factura_telefono?: string;
  factura_email?: string;
}