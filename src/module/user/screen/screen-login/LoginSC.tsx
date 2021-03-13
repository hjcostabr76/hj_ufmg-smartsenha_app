import { useIsFocused } from '@react-navigation/native'
import { Button, Form, Input, Item, Label, Text } from 'native-base'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'

import { AppStateManager } from '../../../../common/AppStateManager'
import { Logger } from '../../../../common/Logger'
import { LoaderCP } from '../../../../common/components/loader/LoaderCP'
import { PropsWithNavigationTP } from '../../../../common/components/navigator/inner/PropsWithNavigationTP'
import { NotificationUtils } from '../../../../common/utils/NotificationUtils'
import { AppConfig } from '../../../../config/AppConfig'
import { AppNavigationConfigTP } from '../../../../config/AppNavigationConfigTP'
import { ThemeConfig } from '../../../../config/ThemeConfig'
import { MockedLocations } from '../../../../config/mock/type/MockedLocations'
import { UserRequests } from '../../UserRequests'

type PropsTP = PropsWithNavigationTP<AppNavigationConfigTP, 'userLogin'>

/**
 * Tela de login.
 * TODO: Capturar localizacao real do usuario
 */
export function LoginSC(props: PropsTP): React.ReactElement {

    const [userName, setUserName] = useState<string>()
    const [loadedUser, setLoadedUser] = useState<string>()
    const [isInitialized, setIsInitialized] = useState<boolean>(false)
    const [isRunningRequest, setIsRunningRequest] = useState<boolean>(false)

    const isFocused = useIsFocused()

    useEffect(() => { loadUser() }, [])
    useEffect(() => { loadUser() }, [isFocused])

    async function loadUser(): Promise<void> {
        const _loadedUser = await AppStateManager.get('userName')
        setLoadedUser(_loadedUser)
        setUserName(_loadedUser)
        setIsInitialized(true)
    }

    async function onLoginPress(): Promise<void> {

        if (!validate())
            return

        if (userName !== loadedUser)
            await login()

        props.navigation.navigate('establishmentSelect')
    }

    async function login(): Promise<void> {

        try {

            setIsRunningRequest(true)
            const authToken = await UserRequests.login(userName!)
            setLoggedUserData(authToken)

        } catch (error) {
            Logger.error(`FALHA - ${onLoginPress.name}: `, error)
            NotificationUtils.showError('Falha! Favor tentar novamente em instantes')

        } finally {
            setIsRunningRequest(false)
        }
    }

    function setLoggedUserData(authToken: string): void {

        // Determina localizacao do usuario
        let latitude = 0
        let longitude = 0
        let currentAddress = ''

        if (AppConfig.load().isSimulation) {
            const userLocation = MockedLocations.find(location => location.userName === userName)
            latitude = userLocation?.coordinates.latitude ?? latitude
            longitude = userLocation?.coordinates.longitude ?? longitude
            currentAddress = userLocation?.address ?? currentAddress
        }

        // Coloca dados do usuario no estado da aplicacao
        AppStateManager.set('userName', userName!)
        AppStateManager.set('authToken', authToken)

        AppStateManager.set('latitude', latitude)
        AppStateManager.set('longitude', longitude)
        AppStateManager.set('currentAddress', currentAddress)
    }

    function validate(): boolean {

        const isValidUserName = AppConfig.load().isSimulation
            ? MockedLocations.some(location => location.userName === userName)
            : !!userName

        if (isValidUserName)
            return true

        NotificationUtils.showError('Insira o Nome para prosseguir')
        return false

    }

    function onChangeText(text: string): void {
        if (isInitialized)
            setUserName(text)
    }

    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'stretch',
            paddingHorizontal: 20,
        }}>
            <LoaderCP show={!isInitialized || isRunningRequest} />

            <Form>
                <Item floatingLabel>
                    <Label>Nome</Label>
                    <Input style={{ textAlign: 'left' }} onChangeText={onChangeText} value={userName} />
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
