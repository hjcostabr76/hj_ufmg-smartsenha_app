/**
 * Formato esperado para retorno da api externa de dados da entidade ESTABELECIMENTO.
 */
export interface IEstablishment {
    id: number
    name: string
    address: string
    latitude: number
    longitude: number
    raio: number
}
