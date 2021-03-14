import { Root as NativeBaseRoot } from 'native-base'
import React, { useEffect, useState } from 'react'

import { Logger } from './common/Logger'
import { LoaderCP } from './common/component/loader/LoaderCP'

import { NavigatorCP } from './common/component/navigator/NavigatorCP'
import { AppNavigationConfigTP } from './config/AppNavigationConfigTP'
import { ThemeConfig } from './config/ThemeConfig'
import { EstablishmentSelectionSCNavConfig } from './module/establishment/screen/screen-establishment-selection/EstablishmentSelectionSCNavConfig'
import { PasswordDetailsSCNavConfig } from './module/password/screen/screen-password-details/PasswordDetailsSCNavConfig'
import { PasswordQrCodeReadingSCNavConfig } from './module/password/screen/screen-password-qr-code/PasswordQrCodeReadingSCNavConfig'
import { LoginSCNavConfig } from './module/user/screen/screen-login/LoginSCNavConfig'

/**
 * Componente principal de inicialização do APP.
 * @see AppConfig
 */
export default function(): React.ReactNode { // eslint-disable-line import/no-default-export

    const [isInitialized, setIsInitialized] = useState<boolean>(false)

    useEffect(initialize, [])

    function initialize(): void {
        Logger.enable(__DEV__)
        setIsInitialized(true)
    }

    if (!isInitialized)
        return <LoaderCP/>

    return (
        <NativeBaseRoot>
            <NavigatorCP<AppNavigationConfigTP>
                routes={{
                    userLogin: LoginSCNavConfig,
                    establishmentSelect: EstablishmentSelectionSCNavConfig,
                    pwdDetails: PasswordDetailsSCNavConfig,
                    pwdDetailsQRCodeCatching: PasswordQrCodeReadingSCNavConfig,
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
