import { useIsFocused } from '@react-navigation/native'
import { Button, Container, Grid, H1, H3, Icon, Row, Text } from 'native-base'
import React, { useEffect, useState } from 'react'

import { AppStateManager } from '../../../../common/AppStateManager'
import { Logger } from '../../../../common/Logger'
import { LoaderCP } from '../../../../common/component/loader/LoaderCP'
import { ModalCP } from '../../../../common/component/modal/ModalCP'
import { PropsWithNavigationTP } from '../../../../common/component/navigator/inner/PropsWithNavigationTP'
import { OrUndefTP } from '../../../../common/types/OrUndefTP'
import { NotificationUtils } from '../../../../common/utils/NotificationUtils'
import { AppNavigationConfigTP } from '../../../../config/AppNavigationConfigTP'
import { ThemeConfig } from '../../../../config/ThemeConfig'
import { IPassword } from '../../IPassword'
import { PasswordRequests } from '../../PasswordRequests'
import { PasswordDetailsSCMocks } from './PasswordDetailsSCMocks'

const INTERVAL_CHECKING = 5000

type PropsTP = PropsWithNavigationTP<AppNavigationConfigTP, 'pwdDetails'>

/**
 * Tela de acompanhamento com detalhes de uma senha.
 * TODO: Exibir estimativa real de tempo de espera
 */
export function PasswordDetailsSC(props: PropsTP): React.ReactElement {

    const [password, setPassword] = useState<IPassword>()
    const [isCanceling, setIsCanceling] = useState<boolean>(false)
    const [establishmentName, setEstablishmentName] = useState<string>()
    const [showModalAttendanceTime, setShowModalAttendanceTime] = useState<boolean>(false)
    const [isUserAwareOfItsAttendance, setIsUserAwareOfItsAttendance] = useState<boolean>(false)

    const isFocused = useIsFocused()

    useEffect(() => { updatePasswordAttendanceState() }, [])
    useEffect(() => { updatePasswordAttendanceState() }, [isFocused])

    async function updatePasswordAttendanceState(): Promise<void> {

        if (!isFocused || password?.already_attended)
            return

        // Atualiza dados atualizados da senha
        const _passwordID = Number(await AppStateManager.get('passwordID') ?? 0)
        const _establishmentName = await AppStateManager.get('establishmentName') ?? ''
        const _password = await getPassword(_passwordID)

        if (!_password)
            return

        setEstablishmentName(_establishmentName)
        setPassword(_password)

        // Avalia necessidade de atualizar dados da senha novamente
        if (_password.already_attended || _password.canceled) // Criterio de parada
            return

        if (_password.currently_calling && !isUserAwareOfItsAttendance)
            return setShowModalAttendanceTime(true)

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

    function onModalPasswordAttendanceTimeClose(): void {
        setIsUserAwareOfItsAttendance(true)
        setShowModalAttendanceTime(false)
    }

    // Define texto sobre posicao do usuario, na fila
    let positionReportText: string

    const isLoading = !password || isCanceling
    const usersAhead = password?.usersAhead ?? 0

    if (isLoading)
        positionReportText = 'Carregando...'
    else if (password?.currently_calling)
        positionReportText = 'Em atendimento'
    else if (!password?.already_attended)
        positionReportText = ((usersAhead > 1) ? `Há ${usersAhead} pessoas na sua frente` : 'Você é próximo(a)!')
    else
        positionReportText = ''

    // Define titulo principal da tela
    let passwordExhibitionText: string

    if (password?.canceled)
        passwordExhibitionText = 'Senha Cancelada'
    else if (password?.already_attended)
        passwordExhibitionText = 'Atendimento Concluído'
    else
        passwordExhibitionText = ((!isLoading && password?.id) ? `Senha: ${password.id}` : '')

    // Define icone
    let iconName: string

    if (password?.canceled)
        iconName = 'ban'
    else if (password?.already_attended)
        iconName = 'check-circle'
    else
        iconName = (password?.currently_calling ? 'clock' : 'user-circle')

    // Define estimativa de tempo de espera
    const timeEstimateText = (!password?.canceled && !password?.already_attended && !isLoading)
        ? `Tempo estimado de espera: ${PasswordDetailsSCMocks.estimate}`
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
                        <H1 style={{ color: 'white', marginTop: 20, marginBottom: 10 }}>{passwordExhibitionText}</H1>
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
                            }}
                        >
                            <Text>Cancelar Senha</Text>
                        </Button>
                    }

                    {
                        password?.already_attended
                        && <Button
                            block
                            onPress={() => props.navigation.navigate('establishmentSelect')}
                            disabled={password?.currently_calling}
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
                onClose={onModalPasswordAttendanceTimeClose}
                show={showModalAttendanceTime}
                title={'É a sua vez!'}
                subTitle={'Dirija-se para o local do atendimento'}
                buttonText={'OK'}
                titleColor={ThemeConfig.COLOR_PINK}
                overlayColor={ThemeConfig.COLOR_GRAY_LIGHT}
                buttonBackgroundColor={ThemeConfig.COLOR_PINK}
            />
        </>
    )
}
