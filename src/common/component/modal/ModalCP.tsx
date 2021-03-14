import React, { PropsWithChildren, useEffect, useState } from 'react'
import { Modal } from 'react-native'

import { ModalPropsTP } from './inner/ModalPropsTP'

type PropsTP = PropsWithChildren<ModalPropsTP>

/**
 * TODO: ADD Descricao
 */
export function ModalCP(props: PropsTP): React.ReactElement {

    const [show, setShow] = useState<boolean>(false)

    useEffect(() => setShow(props.show), [props.show])

    return (
        <Modal
            animationType={'slide'}
            transparent={true}
            visible={show}
            onRequestClose={() => {
                props.onClose()
                setShow(false)
            }}
        >
            {props.children}
        </Modal>
    )
}
