import { EstablishmentSelectionSCMocks } from '../../establishment/screen/screen-establishment-selection/EstablishmentSelectionSCMocks'

/**
 * MOCKS
 * Dados estaticos falsos uteis para desenvolvimento / teste.
 */
export const PasswordDetailsSCMocks = {
    passwordCode: 'AB-2308',
    position: '10ª',
    estimate: '11 min',
    establishment: EstablishmentSelectionSCMocks.establishments[1] ?? {},
}
