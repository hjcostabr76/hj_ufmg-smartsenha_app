import { useIsFocused } from '@react-navigation/native'
import { Body, Button, List, ListItem, Text } from 'native-base'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'

import { Logger } from '../../../common/Logger'
import { LoaderCP } from '../../../common/components/loader/LoaderCP'
import { NotificationUtils } from '../../../common/utils/NotificationUtils'
import { StringUtils } from '../../../common/utils/StringUtils'
import { ThemeConfig } from '../../../config/ThemeConfig'
import { EstablishmentRequests } from '../EstablishmentRequests'
import { IEstablishment } from '../IEstablishment'

/**
 * TELA: Selecao de estabelecimentos
 */
export function EstablishmentSelectionSC(): React.ReactElement {

    const [establishmentList, setEstablishmentList] = useState<IEstablishment[]>([])
    const [hasSearchBeenRan, setHasSearchBeenRan] = useState<boolean>(false)

    const isFocused = useIsFocused()

    useEffect(() => { getList() }, [])
    useEffect(() => { getList() }, [isFocused])

    const showList = hasSearchBeenRan && !!establishmentList.length

    async function getList(): Promise<void> {

        if (!isFocused || hasSearchBeenRan)
            return

        try {
            setEstablishmentList(await EstablishmentRequests.get())

        } catch (error) {
            Logger.error(`FALHA - ${getList.name}`, error)
            NotificationUtils.showError('Falha ao atualizar lista de estabelecimentos')

        } finally {
            setHasSearchBeenRan(true)
        }
    }

    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'stretch',
        }}>

            {
                hasSearchBeenRan
                    && <Button
                        block
                        style={{
                            backgroundColor: ThemeConfig.COLOR_GRAY,
                            marginHorizontal: 15,
                            marginTop: 20,
                            marginBottom: 10,
                        }}
                    >
                        <Text>Escanear ads</Text>
                    </Button>
            }

            {
                !hasSearchBeenRan
                && <LoaderCP />
            }

            {
                !showList
                && <Text style={{ marginTop: 80, textAlign: 'center' }}>
                    {hasSearchBeenRan ? 'Nenhum estabelecimento disponível...' : 'Carregando...'}
                </Text>
            }

            {
                showList
                && <List>
                    {
                        establishmentList.map((establishment, i) => (
                            <ListItem avatar key={StringUtils.getSlugStyleString(`${i}-${establishment.name}`)}>
                                <Body>
                                    <Text>{establishment.name}</Text>
                                    <Text>{establishment.address}</Text>
                                </Body>
                            </ListItem>
                        ))
                    }
                </List>
            }
        </View>
    )
}
