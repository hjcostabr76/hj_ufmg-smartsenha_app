import React from 'react'

import { PropsWithNavigationTP } from '../../../../common/component/navigator/inner/PropsWithNavigationTP'
import { QrCodeReadingScreenWrapperCP } from '../../../../common/component/screen-qr-code-reading/QrCodeReadingScreenWrapperCP'
import { NotificationUtils } from '../../../../common/utils/NotificationUtils'
import { AppNavigationConfigTP } from '../../../../config/AppNavigationConfigTP'
import { PasswordUtils } from '../../utils/PasswordUtils'

type QrCodeDataTP = {
    establishmentID: number,
    establishmentName: string,
}

type PropsTP = PropsWithNavigationTP<AppNavigationConfigTP, 'pwdDetailsQRCodeCatching'>

/**
 * TODO: ADD Descricao
 * TODO: Captura senha real
 */
export function PasswordQrCodeReadingSC(props: PropsTP): React.ReactElement {

    function onCodeRead(qrCodeData?: QrCodeDataTP): void {

        if (Number.isNaN(qrCodeData?.establishmentID) || !qrCodeData?.establishmentName)
            return NotificationUtils.showError('Código Inválido!')

        PasswordUtils.onPasswordEmissionSuccess(qrCodeData.establishmentID, qrCodeData.establishmentName)
        props.navigation.navigate('pwdDetails')
    }

    return <QrCodeReadingScreenWrapperCP<QrCodeDataTP> onQrCodeRead={onCodeRead}/>
}
