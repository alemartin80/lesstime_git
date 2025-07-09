import { Traduccion } from '../interfaces/traduccion.interface';
import { v4 as uuidv4 } from 'uuid';

export function getTexto(elementos: Traduccion[], idioma: string): string {
 
  try {
    return elementos?.filter((n: any) => {
      return n.idioma == idioma;
    })[0]?.texto || 'falta traducir'

  } catch (error) {
    console.error('getTraduccion ERROR', elementos, error)
    return 'falta traducir'
  }


}
 
export function generarUuid(): string {

  return uuidv4();
}
export function getID(): string {
  return crypto.randomUUID()
}