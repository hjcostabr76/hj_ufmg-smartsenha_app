import AsyncStorage from '@react-native-async-storage/async-storage'

import { AppStateConfigTP } from '../config/AppStateConfigTP'
import { Logger } from './Logger'
import { OrUndefTP } from './types/OrUndefTP'

type KeysTP = Array<keyof AppStateConfigTP>

/**
 * Gerencia acesso, leitura & escrita de propriedades de estado global do aplicativo.
 */
export class AppStateManager {

    /**
     * TODO: Definir forma de tipar corretamente os valores para leitura (get)
     */
    static async get(key: keyof AppStateConfigTP): Promise<OrUndefTP<string>> {
        return (await AsyncStorage.getItem(key)) ?? undefined
    }

    static set<AppStateConfigTP>(values: Partial<AppStateConfigTP>): Promise<void>
    static set<KeyTP extends keyof AppStateConfigTP>(key: KeyTP, value: AppStateConfigTP[KeyTP]): Promise<void>

    static async set<KeyTP extends keyof AppStateConfigTP = any>(param1: KeyTP | Partial<AppStateConfigTP>, value?: AppStateConfigTP[KeyTP]): Promise<void> {

        // Inclui valor unico
        if (typeof param1 !== 'object')
            return AsyncStorage.setItem(param1, value?.toString() ?? '')

        // Inclui varios valores de uma vez
        const partialState = param1
        const stateKeys = Object.keys(partialState) as KeysTP
        const keyValuePairs = stateKeys.map<[keyof AppStateConfigTP, string]>(key => [key, partialState[key]?.toString() ?? ''])

        return AsyncStorage.multiSet(keyValuePairs)
    }

    static async clear(keys: KeysTP): Promise<void>
    static async clear(): Promise<void>

    static async clear(keys?: KeysTP): Promise<void> {
        return keys?.length ? AsyncStorage.multiRemove(keys) : AsyncStorage.clear()
    }

    static async debugState(): Promise<void> {
        const currentKeys = await AsyncStorage.getAllKeys() as KeysTP
        Logger.info('DEBUG - AppState:: ', await AsyncStorage.multiGet(currentKeys))
    }
}
