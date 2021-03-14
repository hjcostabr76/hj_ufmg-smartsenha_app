import { View, H1, Text, Button } from 'native-base'
import React, { useEffect, useState } from 'react'

import { ModalCP } from '../../../../common/component/modal/ModalCP'
import { ModalPropsTP } from '../../../../common/component/modal/inner/ModalPropsTP'
import { ThemeConfig } from '../../../../config/ThemeConfig'

type PropsTP = ModalPropsTP & { passwordID: number }

/**
 * TODO: ADD Descricao
 */
export function ModalPasswordCreationSuccessCP(props: PropsTP): React.ReactElement {

    const [show, setShow] = useState<boolean>(false)

    useEffect(() => setShow(props.show), [props.show])

    return (
        <ModalCP
            onClose={props.onClose}
            show={show}
        >
            <View style={{

            }}>
                <H1 style={{ color: ThemeConfig.COLOR_PINK }}>Sucesso</H1>
                <Text>Nova senha gerada: ${props.passwordID}</Text>

                <Button
                    block
                    style={{ backgroundColor: ThemeConfig.COLOR_PINK }}
                    onPress={() => setShow(false)}
                >
                    <Text>Avançar</Text>
                </Button>
            </View>
        </ModalCP>
    )
}
