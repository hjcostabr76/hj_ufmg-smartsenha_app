import axios from 'axios'

import { AppStateManager } from '../../common/AppStateManager'
import { AppConfig } from '../../config/AppConfig'
import { IPassword } from './IPassword'

/**
 * TODO: ADD Descricao
 */
export const PasswordRequests = {

    async create(establishmentId: number): Promise<number> {

        const response = await axios({
            method: 'POST',
            url: `${AppConfig.load().apiBaseUrl}/password`,
            data: { establishmentId },
            headers: { 'x-access-token': await AppStateManager.get('authToken') }
        })

        const passwordId = (response as any)?.data?.id as number
        if (!passwordId)
            throw new Error('Falha ao tentar gerar senha')

        return passwordId
    },

    async get(passwordID: number): Promise<IPassword> {

        const response = await axios({
            method: 'GET',
            url: `${AppConfig.load().apiBaseUrl}/password/${passwordID}`,
            headers: { 'x-access-token': await AppStateManager.get('authToken') }
        })

        const password = (response as any)?.data as IPassword
        if (!password)
            throw new Error('Falha ao buscar dados da senha')

        return password
    },

    async cancel(passwordID: number): Promise<void> {
        return void axios({
            method: 'PUT',
            url: `${AppConfig.load().apiBaseUrl}/password/cancel/${passwordID}`,
            headers: { 'x-access-token': await AppStateManager.get('authToken') }
        })
    },
}
