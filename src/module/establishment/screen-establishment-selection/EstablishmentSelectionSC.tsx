import { Body, Button, List, ListItem, Text } from 'native-base'
import React from 'react'
import { View } from 'react-native'

import { StringUtils } from '../../../common/utils/StringUtils'
import { ThemeConfig } from '../../../config/ThemeConfig'
import { EstablishmentSelectionSCMocks } from './EstablishmentSelectionSCMocks'

EstablishmentSelectionSC.NAV_NAME = 'select'
EstablishmentSelectionSC.NAV_TITLE = 'Selecione o Estabelecimento'

/**
 * TELA: Selecao de estabelecimentos
 */
export function EstablishmentSelectionSC(): React.ReactElement {
    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'stretch',
        }}>
            <Button
                block
                style={{
                    backgroundColor: ThemeConfig.COLOR_GRAY,
                    marginHorizontal: 15,
                    marginTop: 20,
                    marginBottom: 10,
                }}
            >
                <Text>Escanear QR Code</Text>
            </Button>

            <List>
                {
                    EstablishmentSelectionSCMocks.establishments.map((establishment, i) => (
                        <ListItem avatar key={StringUtils.getSlugStyleString(`${i}-${establishment.name}`)}>
                            <Body>
                                <Text>{establishment.name}</Text>
                                <Text>{establishment.addressString}</Text>
                            </Body>
                        </ListItem>
                    ))
                }
            </List>
        </View>
    )
}
