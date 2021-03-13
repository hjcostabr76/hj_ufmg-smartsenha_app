import { Button, Text } from 'native-base'
import React from 'react'

import { ThemeConfig } from '../../../config/ThemeConfig'

type PropsTP = {
    onPress: () => void,
}

/**
 * TODO: ADD Desricao
 */
export function ButtonQRCodeCP(props: PropsTP): React.ReactElement {
    return (
        <Button
            block
            onPress={props.onPress}
            style={{
                backgroundColor: ThemeConfig.COLOR_GRAY,
                marginHorizontal: 15,
                marginTop: 20,
                marginBottom: 10,
            }}
        >
            <Text>Escanear QR Code</Text>
        </Button>
    )
}
