import axios from 'axios'

import { AppConfig } from '../../config/AppConfig'
import { IEstablishment } from './IEstablishment'

/**
 * Define requisicoes relacionadas a entidade / modulo ESTABELECIMENTO.
 */
export const EstablishmentRequests = {

    async get(latitude: number, longitude: number): Promise<IEstablishment[]> {

        const response = await axios({
            method: 'GET',
            url: `${AppConfig.load().apiBaseUrl}/establishment/inRadius`,
            params: { latitude, longitude }
        })

        const establishments = (response as any)?.data as IEstablishment[]

        if (!establishments)
            throw new Error('Lista de estabelecimentos não capturada')

        return establishments
    }
}
