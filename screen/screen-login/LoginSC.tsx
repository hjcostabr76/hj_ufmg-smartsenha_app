import { Body, Button, Container, Header, Input, Item, Label, Right, Text, Title } from "native-base"
import React from "react"
import { View } from "react-native"
import { Theme } from "../../config/Theme"

export function LoginSC() {
    return (
      <Container style={{}}>
        <Header style={{ backgroundColor: Theme.COLOR_PINK }} >
          <Body>
            <Title>Smart Senha</Title>
          </Body>
          <Right />
        </Header>

        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'stretch',
          paddingHorizontal: 20,
        }}>
          <Item floatingLabel>
            <Label>Nome Completo</Label>
            <Input style={{ textAlign: 'left' }}/>
          </Item>

          <Button
            block
            style={{ backgroundColor: Theme.COLOR_GRAY, marginBottom: 50 }}
          >
            <Text>Login</Text>
          </Button>
        </View>
      </Container>
  )
}
