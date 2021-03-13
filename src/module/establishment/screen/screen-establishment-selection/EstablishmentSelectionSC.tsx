import { useIsFocused } from '@react-navigation/native'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'

import { AppStateManager } from '../../../../common/AppStateManager'
import { ButtonQRCodeCP } from '../../../../common/component/button-qr-code/ButtonQRCodeCP'
import { PanelUserLocationCP } from '../../../user/component/panel-user-location/PanelUserLocationCP'
import { ListEstablishmentsCP } from '../../component/list-establishments/ListEstablishmentsCP'

/**
 * TELA: Selecao de estabelecimentos
 */
export function EstablishmentSelectionSC(): React.ReactElement {

    const [locationText, setLocationText] = useState<string>('Não foi possível obter a localização')
    const [mustUpdateList, setMustUpdateList] = useState<boolean>(false)

    const isFocused = useIsFocused()

    const debouncedInitialize = _.debounce(initialize, 500) as Function
    useEffect(() => { debouncedInitialize() }, [])
    useEffect(() => { debouncedInitialize() }, [isFocused])

    async function initialize(_mustUpdateList?: boolean): Promise<void> {
        _setMustUpdateList(_mustUpdateList)
        const locationAddress = await AppStateManager.get('currentAddress')
        if (locationAddress)
            setLocationText(locationAddress)
    }

    function _setMustUpdateList(_mustUpdateList?: boolean): void {
        setMustUpdateList(_mustUpdateList ?? isFocused)
    }

    function onQRCodeReading(): void {
        console.log('onQRCodeReading...')
    }

    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'stretch',
        }}>
            {
                !mustUpdateList
                && <ButtonQRCodeCP onPress={onQRCodeReading}/>
            }

            <PanelUserLocationCP locationText={locationText} />
            <ListEstablishmentsCP mustUpdateList={mustUpdateList} onListUpdateEnd={() => _setMustUpdateList(false)}/>
        </View>
    )
}
