import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import { NavigationScreenConfigTP } from '../../common/navigation/NavigationScreenConfigTP'
import { AnyObjTP } from '../../common/types/AnyObjTP'
import { RootNavigatorConfigTP } from './RootNavigatorConfigTP'

const RootStack = createStackNavigator<RootNavigatorConfigTP>() // eslint-disable-line @typescript-eslint/no-unused-vars

type PropsTP = {
    routes: Record<keyof RootNavigatorConfigTP, NavigationScreenConfigTP>,
    initialRoute?: keyof RootNavigatorConfigTP,
    screenOptions?: AnyObjTP,
}

/**
 * CONFIG
 * Gera & retorna configuracao de rotas & transicao de telas
 *
 * NOTE: Componente acoplado as configuracoes do aplicativo
 *
 * TODO: Criar decorator para listar telas sem precisar colocar uma por uma aqui
 */
export function NavigatorCP(props: PropsTP): React.ReactElement {

    const screenNames = Object.keys(props.routes) as Array<keyof RootNavigatorConfigTP>

    return (
        <NavigationContainer>
            <RootStack.Navigator initialRouteName={props.initialRoute ?? screenNames[0]} screenOptions={props.screenOptions}>
                {
                    screenNames.map(screenName => {

                        const config = props.routes[screenName]

                        return (
                            <RootStack.Screen
                                name={screenName}
                                options={{ title: config.title }}
                                component={config.component}
                                initialParams={config.initialParams}
                            />
                        )
                    })
                }
            </RootStack.Navigator>
        </NavigationContainer>
    )
}
