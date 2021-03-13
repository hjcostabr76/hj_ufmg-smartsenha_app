import { AnyObjTP } from '../types/AnyObjTP'
import { OrUndefTP } from '../types/OrUndefTP'

/**
 * TYPE: Navegacao
 *
 * Formato de configuracao para parametros que uma tela espera receber atraves da
 * passagem de parametros entre telas.
 */
export type NavigationRouteParamsTP = Record<string, OrUndefTP<AnyObjTP>>
