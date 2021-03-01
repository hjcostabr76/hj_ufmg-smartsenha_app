import axios from 'axios'

import { AppConfig } from '../../config/AppConfig'

/**
 * Concentra definicao & chamadas de requisicoes externas.
 */
export const UserRequests = {

    async login(name: string): Promise<string> {
        const response = await axios.post(`${AppConfig.getInstance().apiBaseUrl}/login`, { name })
        const { tokenJwt } = response as any
        if (!tokenJwt)
            throw new Error('Token de acesso não detectado')
        return tokenJwt as string
    }
}
