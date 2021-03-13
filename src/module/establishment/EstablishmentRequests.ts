import axios from 'axios'

import { AppConfig } from '../../config/AppConfig'

/**
 * TODO: ADD Descricacao
 */
export const EstablishmentRequests = {

    async get(): Promise<void> {

        const response = await axios.get(`${AppConfig.load().apiBaseUrl}/users/establishment`)
        const establishments = (response as any)?.data

        if (!establishments)
            throw new Error('continuar daqui...')

    }
}
