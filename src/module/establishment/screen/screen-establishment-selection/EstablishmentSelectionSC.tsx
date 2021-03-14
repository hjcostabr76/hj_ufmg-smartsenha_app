import { useIsFocused } from '@react-navigation/native'
import _ from 'lodash'
import { Button, Text } from 'native-base'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'

import { AppStateManager } from '../../../../common/AppStateManager'
import { LoaderCP } from '../../../../common/component/loader/LoaderCP'
import { ModalCP } from '../../../../common/component/modal/ModalCP'
import { PropsWithNavigationTP } from '../../../../common/component/navigator/inner/PropsWithNavigationTP'
import { NotificationUtils } from '../../../../common/utils/NotificationUtils'
import { AppNavigationConfigTP } from '../../../../config/AppNavigationConfigTP'
import { ThemeConfig } from '../../../../config/ThemeConfig'
import { PasswordUtils } from '../../../password/utils/PasswordUtils'
import { PanelUserLocationCP } from '../../../user/component/panel-user-location/PanelUserLocationCP'
import { IEstablishment } from '../../IEstablishment'
import { ListEstablishmentsCP } from '../../component/list-establishments/ListEstablishmentsCP'

type PropsTP = PropsWithNavigationTP<AppNavigationConfigTP, 'establishmentSelect'>

/**
 * TELA: Selecao de estabelecimentos
 */
export function EstablishmentSelectionSC(props: PropsTP): React.ReactElement {

    const [passwordID, setPasswordID] = useState<number>()
    const [locationText, setLocationText] = useState<string>('Não foi possível obter a localização')
    const [mustUpdateList, setMustUpdateList] = useState<boolean>(false)
    const [isCreatingPassword, setIsCreatingPassword] = useState<boolean>(false)

    const isFocused = useIsFocused()

    const debouncedInitialize = _.debounce(initialize, 500) as Function
    useEffect(() => { debouncedInitialize() }, [])
    useEffect(() => { debouncedInitialize() }, [isFocused])

    async function initialize(): Promise<void> {

        setMustUpdateList(isFocused)
        setPasswordID(undefined) // eslint-disable-line unicorn/no-useless-undefined

        const locationAddress = await AppStateManager.get('currentAddress')
        if (locationAddress)
            setLocationText(locationAddress)
    }

    async function onEstablishmentSelected(establishment: IEstablishment): Promise<void> {

        setIsCreatingPassword(true)
        const creationResult = await PasswordUtils.emitPassword(establishment.id)

        if (!creationResult.passwordID)
            NotificationUtils.showError(creationResult.errorMsg ?? 'Falha ao emitir senha')
        else
            PasswordUtils.onPasswordEmissionSuccess(creationResult.passwordID, establishment.name)

        setIsCreatingPassword(false)
    }

    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'stretch',
        }}>
            <LoaderCP show={mustUpdateList || isCreatingPassword} />

            {
                !mustUpdateList
                && <>
                    <Button
                        block
                        onPress={() => props.navigation.navigate('pwdDetailsQRCodeCatching')}
                        style={{
                            backgroundColor: ThemeConfig.COLOR_GRAY,
                            marginHorizontal: 15,
                            marginTop: 20,
                            marginBottom: 10,
                        }}
                    >
                        <Text>Escanear QR Code</Text>
                    </Button>
                    <PanelUserLocationCP locationText={locationText} />
                </>
            }

            <ListEstablishmentsCP
                mustUpdateList={mustUpdateList}
                onEstablishmentSelected={onEstablishmentSelected}
                onListUpdateEnd={() => setMustUpdateList(false)}
            />

            <ModalCP
                show={!!passwordID}
                title={'Sucesso'}
                subTitle={passwordID ? `Nova senha gerada: ${passwordID}` : ''}
                buttonText={'Avançar'}
                onClose={() => props.navigation.navigate('pwdDetails')}
                titleColor={ThemeConfig.COLOR_PINK}
                overlayColor={ThemeConfig.COLOR_GRAY_LIGHT}
                buttonBackgroundColor={ThemeConfig.COLOR_PINK}
            />
        </View>
    )
}
