import { IEstablishment } from '../../IEstablishment'

/**
 * MOCKS
 * Dados estaticos falsos uteis para desenvolvimento / teste.
 */
export class EstablishmentSelectionSCMocks {

    static readonly establishments: Array<Partial<IEstablishment>> = [
        {
            name: 'Vivo',
            address: 'Avenida Tabapoã, 932 - Setor 03',
        },
        {
            name: 'Banco do Brasil',
            address: 'Rua Joaquim Ribeiro, 164 - Centro',
        },
        {
            name: 'Banco Itaú',
            address: 'Rua Dezenove, 361 - São Luís',
        },
        {
            name: 'Hospital da Unimed',
            address: 'Avenida Beatles, 111 - Cidade Continental',
        },
    ]
}
