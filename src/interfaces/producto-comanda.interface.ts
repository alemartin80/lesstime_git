export interface ProductoComanda {
  clave?: string;
  uid?: string;
  nombre?: any[];
  descripcion?: any[];
  nombreInterno?: string;
  // foto?: string;
  origen?: string;
  fecha?: Date;
  // porcentajeiva?: number;
  //categoria?: string;
  uidcategoria?: string;
  precio?: number;
  cantidad?: number;
  cantidadMinima?: number;
  //cantidadComanda?: number;
  cantidadInicial?: number;
  total?: number;
  estado?: string;
  //cantidadFinal?: number;
  totalFinal?: number;
  opciones?: any[];
  tamanyos?: string;
  //resumen?: string;

  uidUsuario?: string;
  nombreUsuario?: string;
  uidCuenta?: string;
  numeroComanda?: number;
  enviado?: boolean;
  observaciones?: string;
  iva?: string;
  porcentajeiva?: number;
  masTarde?: boolean;
  zz_tamanyos?: any;
  zz_opciones?: any;
  pagado?: boolean;
  utiles?: any;
}