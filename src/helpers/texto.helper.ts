import { Traduccion } from '../interfaces/traduccion.interface';


export function getTexto(elementos: Traduccion[], idioma: string): string {
  console.log('getTexto', elementos, idioma)
  try {
    return elementos?.filter((n: any) => {
      return n.idioma == idioma;
    })[0]?.texto || 'sin salida falta traducir'

  } catch (error) {
    console.error('getTraduccion ERROR', elementos, error)
    return 'sin salida falta traducir'
  }

}