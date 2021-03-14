import { AxiosError } from 'axios'

import { AppStateManager } from '../../../common/AppStateManager'

import { Logger } from '../../../common/Logger'
import { AppStateConfigTP } from '../../../config/AppStateConfigTP'
import { PasswordRequests } from '../PasswordRequests'

/**
 * TODO: ADD Descricao
 */
export const PasswordUtils = {

    async emitPassword(establishmentID: number): Promise<{ passwordID?: number, errorMsg?: string }> {

        try {
            return {
                passwordID: await PasswordRequests.create(establishmentID)
            }

        } catch (error) {

            Logger.error('FALHA - Emissão de senha: ', error)

            return {
                errorMsg: ((error as AxiosError)?.response?.status === 403)
                    ? 'Você só pode solicitar uma senha de cada vez'
                    : 'Falha ao tentar emitir senha'
            }
        }
    },

    async onPasswordEmissionSuccess(passwordID: number, establishmentName: string): Promise<void> {
        return AppStateManager.set<AppStateConfigTP>({ passwordID, establishmentName })
    }
}
