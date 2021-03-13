import { MockedLocationTP } from './MockedLocationTP'

/**
 * MOCK
 * Lista de localizacoes 'mockadas' usadas na apresentacao / simulacao.
 *
 * NOTE: Dados correspondem a localizacoes reais na cidade de Belo Horizonte
 */
export const MockedLocations: MockedLocationTP[] = [
    { // Acessos: parque
        userName: 'Enzo',

        key: 'puc',
        name: 'PUC Coração Eucarístico',
        address: 'R. Dom José Gaspar, 500 - Coração Eucarístico',
        coordinates: { latitude: -19.924290786953982, longitude: -43.99159097540527 },
    },
    { // Acessos: habibs, parque
        userName: 'João',

        key: 'ufmg',
        name: 'UFMG Campos Pampulha',
        address: 'Av. Pres. Antônio Carlos, 6627 - Pampulha',
        coordinates: { latitude: -19.863059773210725, longitude: -43.95820731171737 },
    },
    { // Acessos: parque
        userName: 'Fernanda',

        key: 'cefet1',
        name: 'CEFET Campos I',
        address: 'Av. Amazonas, 5253 - Nova Suíça',
        coordinates: { latitude: -19.9301182168024, longitude: -43.97841287120459 },
    },
    { // Acessos: detran, parque
        userName: 'Karen',

        key: 'cefet2',
        name: 'CEFET Campos II',
        address: 'Av. Amazonas, 7675 - Nova Gameleira',
        coordinates: { latitude: -19.93870127524259, longitude: -43.999163102465744 },
    },
    { // Acessos: habibs, Itau, parque
        userName: 'Oswaldo',

        key: 'mercadoCentral',
        name: 'Mercado Central',
        address: 'Av. Amazonas, 1001 - Centro',
        coordinates: { latitude: -19.921918913595015, longitude: -43.94349174366352 },
    }
]
