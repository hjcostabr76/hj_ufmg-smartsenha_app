import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import { EstablishmentSelectionSC } from '../module/establishment/screen-establishment-selection/EstablishmentSelectionSC'
import { PasswordDetailsSC } from '../module/password/screen-password-details/PasswordDetailsSC'
import { LoginSC } from '../module/user/screen/screen-login/LoginSC'
import { AppConfig } from './AppConfig'
import { Theme } from './Theme'

const Stack = createStackNavigator()

/**
 * CONFIG
 * Componente para definicao de rotas / navegacao do aplicativo.
 */
export function AppNavigator(): React.ReactElement {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={LoginSC.NAV_NAME}
                screenOptions={{
                    headerStyle: { backgroundColor: Theme.COLOR_PINK },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        textAlign: 'center',
                    },
                }}
            >
                <Stack.Screen name={LoginSC.NAV_NAME} options={{ title: LoginSC.NAV_TITLE }} component={LoginSC} />
                <Stack.Screen name={EstablishmentSelectionSC.NAV_NAME} options={{ title: EstablishmentSelectionSC.NAV_TITLE }} component={EstablishmentSelectionSC}/>
                <Stack.Screen name={PasswordDetailsSC.NAV_NAME} options={{ title: PasswordDetailsSC.NAV_TITLE }} component={PasswordDetailsSC} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
