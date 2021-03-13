import AsyncStorage from '@react-native-async-storage/async-storage'

import { AppStateConfigTP } from '../config/AppStateConfigTP'

import { OrUndefTP } from './types/OrUndefTP'

/**
 * Gerencia acesso, leitura & escrita de propriedades de estado global do aplicativo.
 */
export const AppStateManager = {

    /**
     * TODO: Definir forma de tipar corretamente os valores para leitura (get)
     */
    async get(key: keyof AppStateConfigTP): Promise<OrUndefTP<string>> {
        return (await AsyncStorage.getItem(key)) ?? undefined
    },

    /**
     * TODO: Incluir forma de escrita de multiplos valores de uma so vez
     */
    async set<KeyTP extends keyof AppStateConfigTP>(key: KeyTP, value: AppStateConfigTP[KeyTP]): Promise<void> {
        AsyncStorage.setItem(key, value)
    },
}
