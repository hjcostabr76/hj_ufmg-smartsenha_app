import { View, H1, Text, Button } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Modal, ViewStyle } from 'react-native'

import { ModalPropsTP } from './inner/ModalPropsTP'

type PropsTP = ModalPropsTP & {

    title: string,
    subTitle?: string,
    buttonText?: string,
    onButtonPress?: () => void,

    titleColor?: string,
    overlayColor?: string,
    buttonBackgroundColor?: string,
    backgroundColor?: string,

    isTransparent?: boolean,
    mustCloseOnButtonPress?: boolean,

    overlayStyle?: ViewStyle,
    boxStyle?: ViewStyle,
    buttonStyle?: ViewStyle,
}

/**
 * TODO: ADD Descricao
 */
export function ModalCP(props: PropsTP): React.ReactElement {

    const [show, setShow] = useState<boolean>(false)

    useEffect(() => setShow(props.show), [props.show])

    function onButtonPress(): void {
        props.onButtonPress?.()
        if (props.mustCloseOnButtonPress !== false)
            closeModal()
    }

    function closeModal(): void {
        setShow(false)
        props.onClose()
    }

    return (
        <Modal
            animationType={'slide'}
            transparent={props.isTransparent}
            visible={show}
            onRequestClose={closeModal}
        >
            <View style={{
                height: '100%',
                width: '100%',
                backgroundColor: props.overlayColor,
                ...props.overlayStyle,
            }}>

                <View style={{
                    borderColor: 'gray',
                    borderWidth: 1,
                    borderRadius: 3,
                    backgroundColor: props.backgroundColor ?? 'white',
                    width: '85%',
                    alignSelf: 'center',
                    paddingTop: 40,
                    paddingBottom: 30,
                    top: '25%',
                    ...props.boxStyle
                }}>
                    <View style={{
                        marginBottom: 25,
                        alignItems: 'center',
                    }}>
                        <H1 style={{ color: props.titleColor }}>{props.title}</H1>

                        {
                            !!props.subTitle
                            && <Text style={{ fontWeight: 'bold' }}>{props.subTitle}</Text>
                        }
                    </View>

                    <Button
                        onPress={onButtonPress}
                        style={{
                            alignSelf: 'center',
                            backgroundColor: props.buttonBackgroundColor,
                            ...props.buttonStyle
                        }}
                    >
                        <Text>{props.buttonText ?? 'OK'}</Text>
                    </Button>
                </View>
            </View>
        </Modal>
    )
}
