import React, { useState } from 'react'

import { PropsWithNavigationTP } from '../../../../common/component/navigator/inner/PropsWithNavigationTP'
import { QrCodeReadingScreenWrapperCP } from '../../../../common/component/screen-qr-code-reading/QrCodeReadingScreenWrapperCP'
import { OrUndefTP } from '../../../../common/types/OrUndefTP'
import { NotificationUtils } from '../../../../common/utils/NotificationUtils'
import { AppNavigationConfigTP } from '../../../../config/AppNavigationConfigTP'
import { ModalPasswordCreationAlertCP } from '../../component/modal-password-creation-alert/ModalPasswordCreationAlertCP'
import { PasswordUtils } from '../../utils/PasswordUtils'

type PropsTP = PropsWithNavigationTP<AppNavigationConfigTP, 'pwdDetailsQRCodeCatching'>

/**
 * TODO: ADD Descricao
 * TODO: Captura senha real
 */
export function PasswordQrCodeReadingSC(props: PropsTP): React.ReactElement {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [passwordID, setPasswordID] = useState<number>()

    async function onCodeRead(qrCodeData?: string): Promise<void> {

        const parsedCode = getParsedCodeContent(qrCodeData)
        if (!parsedCode.establishmentID || !parsedCode.establishmentName)
            return NotificationUtils.showError('Código Inválido!')

        await generatePassword(parsedCode.establishmentID, parsedCode.establishmentName)
    }

    function getParsedCodeContent(qrCodeData?: string): { establishmentID: OrUndefTP<number>, establishmentName: OrUndefTP<string> } {

        let establishmentID: OrUndefTP<number>
        let establishmentName: OrUndefTP<string>

        qrCodeData?.split('&').forEach(stringPiece => {

            const [prop, value] = stringPiece.split('=')

            if (prop === 'establishmentID' && !Number.isNaN(+value))
                establishmentID = +value
            else if (prop === 'establishmentName' && !!value?.length)
                establishmentName = value
        })

        return { establishmentID, establishmentName }
    }

    async function generatePassword(establishmentID: number, establishmentName: string): Promise<void> {

        setIsLoading(true)
        const creationResult = await PasswordUtils.emitPassword(establishmentID)

        if (!creationResult.passwordID)
            NotificationUtils.showError(creationResult.errorMsg ?? 'Falha ao emitir senha')

        else {
            setPasswordID(creationResult.passwordID)
            PasswordUtils.onPasswordEmissionSuccess(creationResult.passwordID, establishmentName)
        }

        setIsLoading(false)
    }

    return (
        <>
            <QrCodeReadingScreenWrapperCP<string> onQrCodeRead={onCodeRead} isLoading={isLoading}/>

            <ModalPasswordCreationAlertCP
                show={!!passwordID}
                passwordID={passwordID ?? 0}
                onClose={() => props.navigation.navigate('pwdDetails')}
            />
        </>
    )
}
