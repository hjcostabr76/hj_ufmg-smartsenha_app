import { Root as NativeBaseRoot } from 'native-base'
import React from 'react'

import { NavigatorCP } from './common/components/navigator/NavigatorCP'
import { NavigationConfigTP } from './config/NavigationConfigTP'
import { ThemeConfig } from './config/ThemeConfig'
import { LoginSCNavConfig } from './module/user/screen/screen-login/LoginSCNavConfig'

/**
 * Componente principal de inicialização do APP.
 */
export default function(): React.ReactNode { // eslint-disable-line import/no-default-export
    return (
        <NativeBaseRoot>
            <NavigatorCP<NavigationConfigTP>
                routes={{
                    login: LoginSCNavConfig,
                }}
                screenOptions={{
                    headerStyle: { backgroundColor: ThemeConfig.COLOR_PINK },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        textAlign: 'center',
                    },
                }}
            />
        </NativeBaseRoot>
    )
}
