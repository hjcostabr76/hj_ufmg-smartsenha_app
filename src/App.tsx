import { Root as NativeBaseRoot } from 'native-base'
import React from 'react'

import { AppNavigator } from './config/AppNavigator'

/**
 * Componente principal de inicialização do APP.
 */
export default function(): React.ReactNode { // eslint-disable-line import/no-default-export
    return (
        <NativeBaseRoot>
            <AppNavigator/>
        </NativeBaseRoot>
    )
}
