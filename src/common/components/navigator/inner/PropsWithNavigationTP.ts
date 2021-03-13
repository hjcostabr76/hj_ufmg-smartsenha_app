import { StackNavigationProp } from '@react-navigation/stack'

import { AnyObjTP } from '../../../types/AnyObjTP'
import { OrUndefTP } from '../../../types/OrUndefTP'

/**
 * Tipo a ser extendido por props de uma tela que faz parte do sistema de navegacao.
 */
export type PropsWithNavigationTP<NavConfigTP extends Record<string, OrUndefTP<AnyObjTP>>, RouteTP extends keyof NavConfigTP> = {
    navigation: StackNavigationProp<NavConfigTP, RouteTP>,
}
