import axios from 'axios'

import { AppConfig } from '../../config/AppConfig'

/**
 * Concentra definicao & chamadas de requisicoes externas.
 */
export const UserRequests = {

    async login(name: string): Promise<string> {

        const response = await axios.post(`${AppConfig.load().apiBaseUrl}/users/login`, { name })
        const tokenJwt = (response as any)?.data?.tokenJwt as string

        if (!tokenJwt)
            throw new Error('Token de acesso não detectado')

        return tokenJwt
    }
}
