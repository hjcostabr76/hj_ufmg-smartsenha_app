import { useIsFocused } from '@react-navigation/native'
import _ from 'lodash'
import { Button, Container, Grid, H1, H3, Icon, Row, Text } from 'native-base'
import React, { useEffect, useState } from 'react'

import { AppStateManager } from '../../../../common/AppStateManager'
import { Logger } from '../../../../common/Logger'
import { LoaderCP } from '../../../../common/component/loader/LoaderCP'
import { ModalCP } from '../../../../common/component/modal/ModalCP'
import { PropsWithNavigationTP } from '../../../../common/component/navigator/inner/PropsWithNavigationTP'
import { NotificationUtils } from '../../../../common/utils/NotificationUtils'
import { AppNavigationConfigTP } from '../../../../config/AppNavigationConfigTP'
import { ThemeConfig } from '../../../../config/ThemeConfig'
import { IPassword } from '../../IPassword'
import { PasswordRequests } from '../../PasswordRequests'

const INTERVAL_CHECKING = 10000 // milisegundos
const TIME_ATTENDANCE_AVERAGE = 5 // minutos

type PropsTP = PropsWithNavigationTP<AppNavigationConfigTP, 'pwdDetails'>

/**
 * Tela de acompanhamento com detalhes de uma senha.
 * TODO: Exibir estimativa real de tempo de espera
 */
export function PasswordDetailsSC(props: PropsTP): React.ReactElement {

    const [password, setPassword] = useState<IPassword>()
    const [isCanceling, setIsCanceling] = useState<boolean>(false)
    const [updatesCount, setUpdatesCount] = useState<number>(0)
    const [establishmentName, setEstablishmentName] = useState<string>()
    const [isUserAwareOfItsAttendance, setIsUserAwareOfItsAttendance] = useState<boolean>(false)

    const isFocused = useIsFocused()

    const deboucedUdatePasswordState = _.debounce(updatePasswordState, 500)
    useEffect(deboucedUdatePasswordState, [isFocused, updatesCount])
    useEffect(deboucedUdatePasswordState, [])

    function updatePasswordState(): void {

        // Verifica se o atendimento ja foi concluido
        if (password?.canceled && isCanceling)
            return setIsCanceling(false)

        if (!isFocused || password?.already_attended)
            return

        // Atualiza dados da senha / atendimento
        const delay = !updatesCount ? 0 : INTERVAL_CHECKING
        setTimeout(() => { getPassword() }, delay)

        // Busca assincrona unica para nome do estabelecimento (nao precisa esperar)
        if (establishmentName)
            return

        AppStateManager.get('establishmentName')
            .then(name => setEstablishmentName(name))
            .catch(error => Logger.error('FALHA - Erro ao determinar nome do estabelecimento', error))
    }

    async function getPassword(): Promise<void> {

        try {
            const _passwordID = Number(await AppStateManager.get('passwordID') ?? 0)
            setPassword(await PasswordRequests.get(_passwordID))
            setUpdatesCount(updatesCount + 1)

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
        }
    }

    function finishAttendance(): void {
        AppStateManager.clear(['establishmentName', 'passwordID'])
        props.navigation.navigate('establishmentSelect')
    }

    // Define titulo principal da tela
    let screenTitle: string

    if (password?.canceled)
        screenTitle = 'Senha Cancelada'
    else if (password?.already_attended)
        screenTitle = 'Atendimento Concluído'
    else if (password?.currently_calling)
        screenTitle = 'É a sua vez!'
    else
        screenTitle = ((!isLoading && password?.id) ? `Senha: ${password.id}` : '')

    // Define texto sobre posicao do usuario, na fila
    let positionReportText: string

    const isLoading = !password || isCanceling
    const usersAhead = password?.usersAhead ?? 0

    if (isLoading)
        positionReportText = 'Carregando...'
    else if (password?.currently_calling)
        positionReportText = 'Em atendimento'
    else if (password?.canceled)
        positionReportText = 'Obrigado por colaborar!'
    else if (!password?.already_attended)
        positionReportText = ((usersAhead > 1) ? `Há ${usersAhead} pessoas na sua frente` : 'Você é próximo(a)!')
    else
        positionReportText = `Senha: ${password.id}`

    // Define icone
    let iconName: string

    if (password?.canceled)
        iconName = 'ban'
    else if (password?.already_attended)
        iconName = 'check-circle'
    else
        iconName = (password?.currently_calling ? 'clock-o' : 'user-circle')

    // Define estimativa de tempo de espera
    const timeEstimateText = (!password?.canceled && !password?.currently_calling && !password?.already_attended && !isLoading)
        ? `Tempo estimado de espera: ${usersAhead ? (TIME_ATTENDANCE_AVERAGE * usersAhead) : 1} minuto(s)`
        : ''

    return (
        <>
            <Container style={{ backgroundColor: ThemeConfig.COLOR_GRAY }}>
                <Grid>
                    <Row style={{
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        flex: 4,
                        backgroundColor: 'white',
                    }}>
                        {
                            isLoading
                                ? <LoaderCP/>
                                : <Icon type={'FontAwesome'} name={iconName} style={{ fontSize: 80, color: ThemeConfig.COLOR_GRAY }}/>
                        }
                    </Row>

                    <Row style={{
                        flex: 1.5,
                        alignItems: 'center',
                        paddingHorizontal: 20,
                        flexDirection: 'column',
                    }}>
                        <H1 style={{ color: 'white', marginTop: 20, marginBottom: 10 }}>{screenTitle}</H1>
                        <H3 style={{ color: 'white' }}>{!isLoading ? establishmentName : ''}</H3>
                    </Row>

                    <Row style={{
                        flex: 3.5,
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}>
                        <Text style={{ textAlign: 'center', color: 'white', marginTop: 30 }}>
                            {positionReportText}
                        </Text>

                        <Text style={{ textAlign: 'center', color: 'white' }}>{timeEstimateText}</Text>
                    </Row>

                    {
                        !password?.already_attended
                        && <Button
                            block
                            onPress={cancelPassword}
                            disabled={password?.currently_calling}
                            style={{
                                backgroundColor: ThemeConfig.COLOR_PINK,
                                marginBottom: 30,
                                marginHorizontal: 15,
                                opacity: password?.currently_calling ? .5 : 1,
                            }}
                        >
                            <Text>{isCanceling ? 'Cancelando...' : 'Cancelar Senha'}</Text>
                        </Button>
                    }

                    {
                        password?.already_attended
                        && <Button
                            block
                            onPress={finishAttendance}
                            style={{
                                backgroundColor: ThemeConfig.COLOR_GRAY_LIGHT,
                                marginBottom: 30,
                                marginHorizontal: 15,
                            }}
                        >
                            <Text style={{ color: 'black' }}>Voltar</Text>
                        </Button>
                    }
                </Grid>
            </Container>

            <ModalCP
                onClose={() => setIsUserAwareOfItsAttendance(true)}
                show={!!password?.currently_calling && !isUserAwareOfItsAttendance}
                title={'É a sua vez!'}
                subTitle={'Dirija-se ao local do atendimento'}
                buttonText={'OK'}
                titleColor={ThemeConfig.COLOR_PINK}
                overlayColor={ThemeConfig.COLOR_GRAY_LIGHT}
                buttonBackgroundColor={ThemeConfig.COLOR_PINK}
            />
        </>
    )
}
