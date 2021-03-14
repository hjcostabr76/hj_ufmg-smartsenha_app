import { useIsFocused } from '@react-navigation/native'
import { AxiosError } from 'axios'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'

import { AppStateManager } from '../../../../common/AppStateManager'
import { Logger } from '../../../../common/Logger'
import { ButtonQRCodeCP } from '../../../../common/component/button-qr-code/ButtonQRCodeCP'
import { LoaderCP } from '../../../../common/component/loader/LoaderCP'
import { PropsWithNavigationTP } from '../../../../common/component/navigator/inner/PropsWithNavigationTP'
import { NotificationUtils } from '../../../../common/utils/NotificationUtils'
import { AppNavigationConfigTP } from '../../../../config/AppNavigationConfigTP'
import { AppStateConfigTP } from '../../../../config/AppStateConfigTP'
import { PasswordRequests } from '../../../password/PasswordRequests'
import { PanelUserLocationCP } from '../../../user/component/panel-user-location/PanelUserLocationCP'
import { IEstablishment } from '../../IEstablishment'
import { ListEstablishmentsCP } from '../../component/list-establishments/ListEstablishmentsCP'
import { ModalPasswordCreationSuccessCP } from '../../component/modal-password-creation-success/ModalPasswordCreationSuccessCP'

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

    function onQRCodeReading(): void {
        throw new Error('Implementar leitura de qr code...')
    }

    async function onEstablishmentSelected(establishment: IEstablishment): Promise<void> {

        try {

            setIsCreatingPassword(true)
            const _passwordID = await PasswordRequests.create(establishment.id)
            setPasswordID(_passwordID)

            AppStateManager.set<AppStateConfigTP>({
                passwordID: _passwordID,
                establishmentName: establishment.name
            })

        } catch (error) {

            const message = ((error as AxiosError)?.response?.status === 403)
                ? 'Você só pode solicitar uma senha de cada vez'
                : 'Falha ao tentar emitir senha'

            Logger.error(`FALHA - ${onEstablishmentSelected.name}: `, error)
            NotificationUtils.showError(message)

        } finally {
            setIsCreatingPassword(false)
        }
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
                    <ButtonQRCodeCP onPress={onQRCodeReading}/>
                    <PanelUserLocationCP locationText={locationText} />
                </>
            }

            <ListEstablishmentsCP
                mustUpdateList={mustUpdateList}
                onEstablishmentSelected={onEstablishmentSelected}
                onListUpdateEnd={() => setMustUpdateList(false)}
            />

            <ModalPasswordCreationSuccessCP
                show={!!passwordID}
                passwordID={passwordID ?? 0}
                onClose={() => props.navigation.navigate('pwdDetails')}
            />
        </View>
    )
}
