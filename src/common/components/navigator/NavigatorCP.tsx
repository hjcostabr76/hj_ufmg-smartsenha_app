import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useState } from 'react'

import { AnyObjTP } from '../../types/AnyObjTP'
import { OrUndefTP } from '../../types/OrUndefTP'
import { NavigationScreenConfigTP } from './inner/NavigationScreenConfigTP'

type NavigatorConfigTP = Record<string, OrUndefTP<AnyObjTP>>

type PropsTP<ConfigTP extends NavigatorConfigTP> = {
    routes: Record<keyof ConfigTP, NavigationScreenConfigTP>,
    initialRoute?: keyof ConfigTP,
    screenOptions?: AnyObjTP,
}

/**
 * CONFIG
 * Gera & retorna configuracao de rotas & transicao de telas
 */
export function NavigatorCP<ConfigTP extends NavigatorConfigTP>(props: PropsTP<ConfigTP>): React.ReactElement | null {

    const [stackCP] = useState(createStackNavigator<ConfigTP>())

    const screenNames = Object.keys(props.routes) as Array<keyof ConfigTP>

    if (!screenNames.length || !stackCP)
        return null

    return (
        <NavigationContainer>
            <stackCP.Navigator
                screenOptions={props.screenOptions}
                initialRouteName={(props.initialRoute ?? screenNames[0]) as Extract<keyof ConfigTP, string>}
            >
                {
                    screenNames.map(screenName => {

                        const config = props.routes[screenName]

                        return (
                            <stackCP.Screen
                                name={screenName}
                                options={{ title: config.title }}
                                component={config.component}
                                initialParams={config.initialParams}
                            />
                        )
                    })
                }
            </stackCP.Navigator>
        </NavigationContainer>
    )
}
