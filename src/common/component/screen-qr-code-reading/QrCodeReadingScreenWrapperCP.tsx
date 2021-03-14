import { H3 } from 'native-base'
import React from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner'

import { ThemeConfig } from '../../../config/ThemeConfig'
import { LoaderCP } from '../loader/LoaderCP'

type PropsTP<DataTP = any> = {
    onQrCodeRead: (data?: DataTP) => void,
    title?: string,
    isLoading?: boolean,
}

/**
 * TODO: ADD Desricao
 * TODO: Transformar num componente interno a um botao de leitura de qr code
 */
export function QrCodeReadingScreenWrapperCP<DataTP = any>(props: PropsTP<DataTP>): React.ReactElement {
    return (
        <QRCodeScanner
            onRead={event => props.onQrCodeRead(event?.data as unknown as DataTP)}
            fadeIn={true}
            showMarker={true}
            containerStyle={{ backgroundColor: ThemeConfig.COLOR_GRAY_LIGHT }}
            topContent={
                props.isLoading
                    ? <LoaderCP/>
                    : <H3 style={{
                        marginBottom: 40,
                        zIndex: 1000,
                        flex: 1,
                        paddingTop: 25,
                        fontWeight: 'bold',
                    }}>
                        {props.title ?? 'Aproxime a Câmera do QR Code'}
                    </H3>
            }
        />
    )
}
