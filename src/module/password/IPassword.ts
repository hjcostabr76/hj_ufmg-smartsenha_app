/**
 * Formato esperado para retorno da api externa de dados de SENHA.
 */
export interface IPassword {
    id: number
    establishment: number
    currently_calling: boolean
    already_attended: boolean
    usersAhead: number
    canceled: boolean
}
