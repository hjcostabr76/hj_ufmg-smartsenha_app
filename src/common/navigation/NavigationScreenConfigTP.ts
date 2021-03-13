import React from 'react'

import { OrUndefTP } from '../types/OrUndefTP'
import { NavigationRouteParamsTP } from './NavigationRouteParamsTP'

/**
 * TYPE: Navegacao
 *
 * Parametros de configuracao de roteamento para 01 tela.
 */
export type NavigationScreenConfigTP<NavParamsTP extends OrUndefTP<NavigationRouteParamsTP> = undefined> = {
    component: React.FunctionComponent,
    initialParams?: NavParamsTP,
    title?: string,
}
