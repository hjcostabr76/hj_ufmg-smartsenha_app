import _ from 'lodash'
import { Button, H1, Text, View } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Modal, ViewStyle } from 'react-native'

type PropsTP = {

    show: boolean,

    title: string,
    subTitle?: string,
    buttonText?: string,

    onClose?: () => void,
    onButtonPress?: () => void,

    titleColor?: string,
    overlayColor?: string,
    backgroundColor?: string,
    buttonBackgroundColor?: string,

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
    const [isInitialized, setIsInitialized] = useState<boolean>(false)

    const deboucedUpdateExhibitionState = _.debounce(updateExhibitionState, 500)
    useEffect(() => deboucedUpdateExhibitionState(props.show), [props.show])
    useEffect(() => setIsInitialized(true), [])

    function onButtonPress(): void {
        props.onButtonPress?.()
        if (props.mustCloseOnButtonPress !== false)
            deboucedUpdateExhibitionState(false)
    }

    function updateExhibitionState(_show: boolean): void {

        if (!isInitialized)
            return

        setShow(_show)
        if (!_show)
            props.onClose?.()
    }

    return (
        <Modal
            animationType={'slide'}
            transparent={props.isTransparent}
            visible={show}
            onRequestClose={() => deboucedUpdateExhibitionState(false)}
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
