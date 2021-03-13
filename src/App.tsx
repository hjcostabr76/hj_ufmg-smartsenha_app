import { Root as NativeBaseRoot } from 'native-base'
import React from 'react'

import { NavigatorCP } from './common/components/navigator/NavigatorCP'
import { AppNavigationConfigTP } from './config/AppNavigationConfigTP'
import { ThemeConfig } from './config/ThemeConfig'
import { EstablishmentSelectionSCNavConfig } from './module/establishment/screen-establishment-selection/EstablishmentSelectionSCNavConfig'
import { PasswordDetailsSCNavConfig } from './module/password/screen-password-details/PasswordDetailsSCNavConfig'
import { LoginSCNavConfig } from './module/user/screen/screen-login/LoginSCNavConfig'

/**
 * Componente principal de inicialização do APP.
 */
export default function(): React.ReactNode { // eslint-disable-line import/no-default-export
    return (
        <NativeBaseRoot>
            <NavigatorCP<AppNavigationConfigTP>
                routes={{
                    userLogin: LoginSCNavConfig,
                    establishmentSelect: EstablishmentSelectionSCNavConfig,
                    pwdDetails: PasswordDetailsSCNavConfig,
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
