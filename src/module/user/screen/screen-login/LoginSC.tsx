import { Button, Form, Input, Item, Label, Text } from 'native-base'
import React, { useState } from 'react'
import { View } from 'react-native'

import { AppStateManager } from '../../../../common/AppStateManager'
import { LoaderCP } from '../../../../common/components/loader/LoaderCP'
import { PropsWithNavigationTP } from '../../../../common/components/navigator/inner/PropsWithNavigationTP'
import { NotificationUtils } from '../../../../common/utils/NotificationUtils'
import { AppNavigationConfigTP } from '../../../../config/AppNavigationConfigTP'
import { ThemeConfig } from '../../../../config/ThemeConfig'
import { UserRequests } from '../../UserRequests'

type PropsTP = PropsWithNavigationTP<AppNavigationConfigTP, 'user_login'>

/**
 * Tela de login.
 */
export function LoginSC(props: PropsTP): React.ReactElement {

    const [userName, setUserName] = useState<string>()
    const [isRunningRequest, setIsRunningRequest] = useState<boolean>(true)

    async function onLoginPress(): Promise<void> {

        if (!validate())
            return

        try {
            setIsRunningRequest(true)
            const authToken = await UserRequests.login(userName!)
            AppStateManager.set('authToken', authToken)
            props.navigation.navigate('establishmentSelect')

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
