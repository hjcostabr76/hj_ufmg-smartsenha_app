import axios from 'axios'

import { AppConfig } from '../../config/AppConfig'
import { IEstablishment } from './IEstablishment'

/**
 * Define requisicoes relacionadas a entidade / modulo ESTABELECIMENTO.
 */
export const EstablishmentRequests = {

    async get(): Promise<IEstablishment[]> {

        const response = await axios.get(`${AppConfig.load().apiBaseUrl}/establishment`)
        const establishments = (response as any)?.data as IEstablishment[]

        if (!establishments)
            throw new Error('Lista de estabelecimentos não capturada')

        return establishments
    }
}
