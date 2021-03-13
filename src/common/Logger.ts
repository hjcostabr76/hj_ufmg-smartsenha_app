type LogLevelTP = 'info' | 'warn' | 'error'

/**
 * Centraliza exibicao segura & gestao de logs.
 */
export class Logger {

    private static isEnabled = false

    static enable(): void {
        this.isEnabled = true
    }

    static disable(): void {
        this.isEnabled = false
    }

    static info(...messages: any[]): void {
        this.log('info', ...messages)
    }

    static error(...messages: any[]): void {
        this.log('error', ...messages)
    }

    static warn(...messages: any[]): void {
        this.log('warn', ...messages)
    }

    private static log(type: LogLevelTP, ...messages: any[]): void {

        if (!this.isEnabled)
            return

        let consoleMethod: Function

        switch (type) {
            /* eslint-disable no-console */
            case 'info':
                consoleMethod = console.log
                break
            case 'warn':
                consoleMethod = console.warn
                break
            case 'error':
            default:
                consoleMethod = console.error
                break
            /* eslint-enable no-console */
        }

        consoleMethod(...messages)
    }
}
