import * as _ from 'lodash'
import { Button, Form, Input, Item, Label, Text, Toast } from 'native-base'
import React, { useState } from 'react'
import { View } from 'react-native'

import { LoaderCP } from '../../../../common/components/loader/LoaderCP'

import { Theme } from '../../../../config/Theme'
import { UserRequests } from '../../UserRequests'

LoginSC.NAV_NAME = 'Login'
LoginSC.NAV_TITLE = 'Smart Senha'

/**
 * Tela de login.
 * TODO: Avancar apos sucesso no login
 */
export function LoginSC(): React.ReactElement {

    const [userName, setUserName] = useState<string>()
    const [isRunningRequest, setIsRunningRequest] = useState<boolean>(true)

    async function onLoginPress(): Promise<void> {

        if (!validate())
            return

        try {
            setIsRunningRequest(true)
            // const loginToken = await UserRequests.login(userName!)
            await UserRequests.login(userName!)

        } catch (error) {
            Toast.show({
                text: 'Falha! Favor tentar novamente em instantes',
                buttonText: 'OK',
                type: 'danger',
                duration: 2500,
            })

        } finally {
            setIsRunningRequest(false)
        }
    }

    function validate(): boolean {

        if (userName)
            return true

        Toast.show({
            text: 'Insira o Nome para prosseguir',
            buttonText: 'OK',
            type: 'danger',
            duration: 2500,
        })

        return false
    }

    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'stretch',
            paddingHorizontal: 20,
        }}>
            <LoaderCP show={isRunningRequest} />

            <Form>
                <Item floatingLabel>
                    <Label>Nome</Label>
                    <Input
                        style={{ textAlign: 'left' }}
                        onChangeText={text => setUserName(text)}
                    />
                </Item>
            </Form>

            <Button
                block
                style={{ backgroundColor: Theme.COLOR_GRAY, marginBottom: 50 }}
                onPress={onLoginPress}
            >
                <Text>Login</Text>
            </Button>
        </View>
    )
}
