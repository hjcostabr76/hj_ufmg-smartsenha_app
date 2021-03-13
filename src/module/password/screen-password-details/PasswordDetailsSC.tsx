import { Button, Container, Grid, H1, H3, Icon, Row, Text } from 'native-base'
import React from 'react'

import { ThemeConfig } from '../../../config/ThemeConfig'
import { PasswordDetailsSCMocks } from './PasswordDetailsSCMocks'

PasswordDetailsSC.NAV_NAME = 'details'
PasswordDetailsSC.NAV_TITLE = 'Aguardando Atendimento'

/**
 * Tela de acompanhamento com detalhes de uma senha.
 */
export function PasswordDetailsSC(): React.ReactElement {
    return (
        <Container style={{ backgroundColor: ThemeConfig.COLOR_GRAY }}>
            <Grid>
                <Row style={{
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    flex: 4,
                    backgroundColor: 'white',
                }}>
                    <Icon type={'FontAwesome'} name={'user-circle'} style={{ fontSize: 80, color: ThemeConfig.COLOR_GRAY }}/>
                </Row>

                <Row
                    style={{
                        flex: 1.5,
                        alignItems: 'center',
                        paddingHorizontal: 20,
                        flexDirection: 'column',
                    }}
                >
                    <H1 style={{ color: 'white', marginTop: 20, marginBottom: 10 }}>Senha: {PasswordDetailsSCMocks.passwordCode}</H1>
                    <H3 style={{ color: 'white' }}>{PasswordDetailsSCMocks.establishment.name}</H3>
                </Row>

                <Row style={{
                    flex: 3.5,
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>
                    <Text style={{ textAlign: 'center', color: 'white', marginTop: 30 }}>
                        Você é a {PasswordDetailsSCMocks.position} pessoa da fila
                    </Text>
                    <Text style={{ textAlign: 'center', color: 'white' }}>Tempo estimado de espera: {PasswordDetailsSCMocks.estimate}</Text>
                </Row>

                <Button
                    block
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
