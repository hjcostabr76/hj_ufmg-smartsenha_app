import { useIsFocused } from '@react-navigation/native'
import { Button, Container, Grid, H1, H3, Icon, Row, Text } from 'native-base'
import React, { useEffect, useState } from 'react'

import { AppStateManager } from '../../../../common/AppStateManager'
import { Logger } from '../../../../common/Logger'
import { LoaderCP } from '../../../../common/component/loader/LoaderCP'
import { OrUndefTP } from '../../../../common/types/OrUndefTP'
import { NotificationUtils } from '../../../../common/utils/NotificationUtils'

import { ThemeConfig } from '../../../../config/ThemeConfig'
import { IPassword } from '../../IPassword'
import { PasswordRequests } from '../../PasswordRequests'
import { PasswordDetailsSCMocks } from './PasswordDetailsSCMocks'

const INTERVAL_CHECKING = 5000

/**
 * Tela de acompanhamento com detalhes de uma senha.
 */
export function PasswordDetailsSC(): React.ReactElement {

    const [password, setPassword] = useState<IPassword>()
    const [establishmentName, setEstablishmentName] = useState<string>()
    const [isCanceling, setIsCanceling] = useState<boolean>(false)

    const isFocused = useIsFocused()

    useEffect(() => { updatePasswordAttendanceState() }, [])
    useEffect(() => { updatePasswordAttendanceState() }, [isFocused])

    const usersAhead = password?.usersAhead ?? 0
    const positionReportText = password?.already_attended
        ? 'Em atendimento'
        : ((usersAhead > 1) ? `Há ${usersAhead} pessoas na sua frente` : 'Você é próximo(a)!')

    async function updatePasswordAttendanceState(): Promise<void> {

        if (!isFocused)
            return

        const _passwordID = Number(await AppStateManager.get('passwordID') ?? 0)
        const _establishmentName = await AppStateManager.get('establishmentName') ?? ''
        const _password = await getPassword(_passwordID)

        if (!_password)
            return

        setEstablishmentName(_establishmentName)
        setPassword(_password)

        if (_password.already_attended)
            throw new Error('Tratar senha expirada...')

        if (_password.currently_calling)
            throw new Error('Tratar senha em atendimento...')

        setTimeout(() => { updatePasswordAttendanceState() }, INTERVAL_CHECKING)
    }

    async function getPassword(_passwordID: number): Promise<OrUndefTP<IPassword>> {
        try {
            return await PasswordRequests.get(_passwordID)

        } catch (error) {
            Logger.error(`FALHA - ${getPassword.name}: `, error)
            NotificationUtils.showError('Falha ao tentar atualizar status da senha')
        }
    }

    async function cancelPassword(): Promise<void> {

        try {
            setIsCanceling(true)
            await PasswordRequests.cancel(password?.id ?? 0)

        } catch (error) {
            Logger.error(`FALHA - ${cancelPassword.name}: `, error)
            NotificationUtils.showError('Falha ao tentar cancelar senha')

        } finally {
            setIsCanceling(false)
        }
    }

    return (
        <Container style={{ backgroundColor: ThemeConfig.COLOR_GRAY }}>

            <LoaderCP show={!password || isCanceling}/>

            <Grid>
                <Row style={{
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    flex: 4,
                    backgroundColor: 'white',
                }}>
                    <Icon type={'FontAwesome'} name={'user-circle'} style={{ fontSize: 80, color: ThemeConfig.COLOR_GRAY }}/>
                </Row>

                <Row style={{
                    flex: 1.5,
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    flexDirection: 'column',
                }}>
                    <H1 style={{ color: 'white', marginTop: 20, marginBottom: 10 }}>Senha: {password?.id ?? '...'}</H1>
                    <H3 style={{ color: 'white' }}>{establishmentName ?? '...'}</H3>
                </Row>

                <Row style={{
                    flex: 3.5,
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>
                    <Text style={{ textAlign: 'center', color: 'white', marginTop: 30 }}>
                        {positionReportText}
                    </Text>

                    <Text style={{ textAlign: 'center', color: 'white' }}>Tempo estimado de espera: {PasswordDetailsSCMocks.estimate ?? '...'}</Text>
                </Row>

                <Button
                    block
                    onPress={cancelPassword}
                    style={{
                        backgroundColor: ThemeConfig.COLOR_PINK,
                        marginBottom: 30,
                        marginHorizontal: 15,
                    }}
                >
                    <Text>Cancelar Senha</Text>
                </Button>
            </Grid>
        </Container>
    )
}
