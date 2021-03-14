import React from 'react'

import { ModalCP } from '../../../../common/component/modal/ModalCP'
import { ModalPropsTP } from '../../../../common/component/modal/inner/ModalPropsTP'
import { ThemeConfig } from '../../../../config/ThemeConfig'

type PropsTP = ModalPropsTP & { passwordID: number }

/**
 * TODO: ADD Descricao
 */
export function ModalPasswordCreationSuccessCP(props: PropsTP): React.ReactElement {
    return (
        <ModalCP
            onClose={props.onClose}
            show={props.show}
            title={'Sucesso'}
            subTitle={`Nova senha gerada: ${props.passwordID}`}
            buttonText={'Avançar'}
            titleColor={ThemeConfig.COLOR_PINK}
            overlayColor={ThemeConfig.COLOR_GRAY_LIGHT}
            buttonBackgroundColor={ThemeConfig.COLOR_PINK}
        />
    )
}
