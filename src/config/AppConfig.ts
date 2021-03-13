import ENV from 'react-native-config'

/**
 * CONFIG
 * Classe central para gerenciamento de acesso a parametros de configuracao do aplicativo.
 */
export class AppConfig {

    readonly apiBaseUrl: string

    private constructor() {
        /* eslint-disable no-restricted-properties */
        this.apiBaseUrl = ENV.URL_API ?? ''
        /* eslint-enable no-restricted-properties */
    }

    private static instance?: AppConfig // eslint-disable-line @typescript-eslint/member-ordering

    static load(): AppConfig {
        if (!this.instance)
            this.instance = new AppConfig()
        return this.instance
    }
}
