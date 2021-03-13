import { View, Text } from 'native-base'
import React from 'react'

import { ThemeConfig } from '../../../../config/ThemeConfig'

type PropsTP = {
    locationText: string,
}

/**
 * TODO: ADD Desc
 */
export function PanelUserLocationCP(props: PropsTP): React.ReactElement {
    return (
        <View style={{
            marginVertical: 15,
            borderBottomWidth: 1,
            borderBottomColor: ThemeConfig.COLOR_GRAY_LIGHT,
            paddingBottom: 8,
        }}>
            <Text style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 17,
            }}>
                Localização Atual
            </Text>

            <Text style={{
                textAlign: 'center',
                color: ThemeConfig.COLOR_PINK,
            }}>
                {props.locationText}
            </Text>
        </View>
    )
}
