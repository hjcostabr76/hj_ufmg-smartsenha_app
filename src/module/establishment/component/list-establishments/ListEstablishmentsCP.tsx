import _ from 'lodash'
import { Body, List, ListItem, Text } from 'native-base'
import React, { ReactElement, useEffect, useState } from 'react'

import { AppStateManager } from '../../../../common/AppStateManager'
import { Logger } from '../../../../common/Logger'
import { LoaderCP } from '../../../../common/component/loader/LoaderCP'
import { NotificationUtils } from '../../../../common/utils/NotificationUtils'
import { StringUtils } from '../../../../common/utils/StringUtils'
import { ThemeConfig } from '../../../../config/ThemeConfig'
import { EstablishmentRequests } from '../../EstablishmentRequests'
import { IEstablishment } from '../../IEstablishment'

type PropsTP = {
    mustUpdateList: boolean,
    onEstablishmentSelected: (establishment: IEstablishment) => void,
    onListUpdateEnd: (success: boolean) => void,
}

export function ListEstablishmentsCP(props: PropsTP): ReactElement {

    const [establishmentList, setEstablishmentList] = useState<IEstablishment[]>([])
    const [hasSearchBeenRan, setHasSearchBeenRan] = useState<boolean>(false)

    const debouncedUpdateList = _.debounce(updateList, 500) as Function
    useEffect(() => { debouncedUpdateList() }, [props.mustUpdateList])

    const showList = hasSearchBeenRan && !!establishmentList.length

    async function updateList(): Promise<void> {

        if (!props.mustUpdateList)
            return

        try {

            const latitude = await AppStateManager.get('latitude') ?? 0
            const longitude = await AppStateManager.get('longitude') ?? 0
            const _establishmentList = await EstablishmentRequests.get(+latitude, +longitude)

            setEstablishmentList(_establishmentList)
            props.onListUpdateEnd(true)

        } catch (error) {
            Logger.error(`FALHA - ${updateList.name}`, error)
            NotificationUtils.showError('Falha ao atualizar lista de estabelecimentos')
            props.onListUpdateEnd(false)

        } finally {
            setHasSearchBeenRan(true)
        }
    }

    return (
        <>
            <LoaderCP show={props.mustUpdateList} />

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
                            <ListItem
                                avatar
                                onPress={() => props.onEstablishmentSelected(establishment)}
                                key={StringUtils.getSlugStyleString(`${i}-${establishment.name ?? ''}`)}
                            >
                                <Body>
                                    <Text style={{
                                        fontWeight: 'bold',
                                        color: ThemeConfig.COLOR_GRAY,
                                    }}>
                                        {establishment.name}
                                    </Text>

                                    <Text style={{ fontSize: 14 }}>
                                        {establishment.address}
                                    </Text>
                                </Body>
                            </ListItem>
                        ))
                    }
                </List>
            }
        </>
    )
}
