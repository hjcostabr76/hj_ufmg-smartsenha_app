import { Button, Form, Input, Item, Label, Text, Toast } from 'native-base'
import React, { useState } from 'react'
import { View } from 'react-native'

import { LoaderCP } from '../../../../common/components/loader/LoaderCP'
import { NotificationUtils } from '../../../../common/utils/NotificationUtils'
import { ThemeConfig } from '../../../../config/ThemeConfig'
import { UserRequests } from '../../UserRequests'

/**
 * Tela de login.
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
            NotificationUtils.showError('Falha! Favor tentar novamente em instantes')

        } finally {
            setIsRunningRequest(false)
        }
    }

    function validate(): boolean {

        if (userName)
            return true

        NotificationUtils.showError('Insira o Nome para prosseguir')
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
                style={{ backgroundColor: ThemeConfig.COLOR_GRAY, marginBottom: 50 }}
                onPress={onLoginPress}
            >
                <Text>Login</Text>
            </Button>
        </View>
    )
}
