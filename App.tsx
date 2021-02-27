import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from "react"
import { LoginSC } from "./screen/screen-login/LoginSC"

const Stack = createStackNavigator();

/**
 * Componente principal de inicialização do APP.
 */
export default function(): React.ReactNode {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={'Login'} component={LoginSC} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}