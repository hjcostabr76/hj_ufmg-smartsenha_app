/**
 * Utilitarios para manipular strings.
 */
export const StringUtils = {

    /** Retorna string sem nenhum acento. */
    removeAccents(string: string): string {

        const replacingCharGroups = {
            áàâã: 'a',
            éèê: 'e',
            íìî: 'i',
            óòôõ: 'o',
            úùû: 'u',
            ç: 'c',
        }

        for (const isUpperCase of [false, true]) {
            for (const charGroup in replacingCharGroups) {
                const charGroupForRegex = isUpperCase ? charGroup.toLocaleUpperCase() : charGroup
                const regex = new RegExp(`[${charGroupForRegex}]`, 'g')
                string = string.replace(regex, replacingCharGroups[charGroup])
            }
        }

        return string
    },

    /** Retorna string sem nenhum caracter especial. */
    removeSpecialCharacters(str: string): string {
        return str.replace(/[^\w\s-_]/gi, '')
    },

    /** Retorna sem acento, caracteres especiais, letras maiusculas ou espacos. */
    getSlugStyleString(string?: string, replaceSpaceWith = '-', maxLength?: number): string {

        if (!string)
            return ''

        string = StringUtils.removeAccents(string.toLowerCase())
        string = StringUtils.removeSpecialCharacters(string)

        replaceSpaceWith = replaceSpaceWith || '-'
        string = string.replace(/\s/g, replaceSpaceWith)

        if (maxLength) {
            const regex = new RegExp(`^(.{${maxLength}})(.*)`, 'g')
            string = string.replace(regex, '$1')
        }

        return string
    },
}
