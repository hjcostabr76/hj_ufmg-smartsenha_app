import { MockLocationKeyTP } from './MockLocationKeyTP'

/**
 * MOCK
 * Formato de 01 objeto com dados mockados de uma localizacao usada para apresentacao / simulacao.
 */
export type MockedLocationTP = {
    key: MockLocationKeyTP,
    userName: string, // Nome de usuario que deve ser usado para adotar essa localizacao
    name: string,
    address: string,
    coordinates: { latitude: number, longitude: number },
}
