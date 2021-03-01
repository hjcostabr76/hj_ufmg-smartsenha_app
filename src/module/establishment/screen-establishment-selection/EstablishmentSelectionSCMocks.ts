type EstablishmentTP = {
    name: string,
    addressString: string,
}

/**
 * MOCKS
 * Dados estaticos falsos uteis para desenvolvimento / teste.
 */
export class EstablishmentSelectionSCMocks {

    static readonly establishments: EstablishmentTP[] = [
        {
            name: 'Vivo',
            addressString: 'Avenida Tabapoã, 932 - Setor 03',
        },
        {
            name: 'Banco do Brasil',
            addressString: 'Rua Joaquim Ribeiro, 164 - Centro',
        },
        {
            name: 'Banco Itaú',
            addressString: 'Rua Dezenove, 361 - São Luís',
        },
        {
            name: 'Hospital da Unimed',
            addressString: 'Avenida Beatles, 111 - Cidade Continental',
        },
    ]
}
