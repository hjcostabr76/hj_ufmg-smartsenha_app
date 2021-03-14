import React from 'react'

import { ModalCP } from '../../../../common/component/modal/ModalCP'
import { ThemeConfig } from '../../../../config/ThemeConfig'

type PropsTP = {
    show: boolean,
    passwordID: number,
    onClose: () => void,
}

/**
 * TODO: ADD Descricao
 */
export function ModalPasswordCreationAlertCP(props: PropsTP): React.ReactElement {
    return (
        <ModalCP
            show={props.show}
            title={'Sucesso'}
            subTitle={props.passwordID ? `Nova senha gerada: ${props.passwordID}` : ''}
            buttonText={'Avançar'}
            onClose={props.onClose}
            titleColor={ThemeConfig.COLOR_PINK}
            overlayColor={ThemeConfig.COLOR_GRAY_LIGHT}
            buttonBackgroundColor={ThemeConfig.COLOR_PINK}
        />
    )
}
