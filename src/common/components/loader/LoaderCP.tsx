import { Spinner } from 'native-base'
import React from 'react'

type PropsTP = {
    show?: boolean,
}

/**
 * Componente animado com um spinner girando para sinalizar carregamento.
 */
export function LoaderCP(props: PropsTP): React.ReactElement {
    return props.show ? <Spinner/> : <></>
}
