export const LOVELACE_MULTIPLIER = 1000000
export const MIN_ADA = 4000000
export const ADA_SYMBOL = '₳'
const NumberFormat = { LOVELACE_MULTIPLIER }
export default NumberFormat

type Notation = 'standard' | 'scientific' | 'engineering' | 'compact' | undefined

export const formatNumber = (input: number, maximumFractionDigits = 2, notation: Notation = 'standard') =>
    Intl.NumberFormat('en-US', {
        maximumFractionDigits,
        notation,
    }).format(input)

export const toAda = (input: number, maximumFractionDigits = 0, notation: Notation = 'standard') => {
    if (!input) return input
    const ada = input / LOVELACE_MULTIPLIER
    return Number.isNaN(ada) ? input : `${formatNumber(ada, maximumFractionDigits, notation).toLocaleString()} ₳`
}

export const shortAddress = (text: string, firstDigitLength = 7, lastDigitLength = 5) => {
    if (!text) return ''
    const { length } = text
    if (text.length < 20) return text
    if (text.includes('stake') || text.includes('addr')) {
        const firstDigits = text.substr(`${text}`.indexOf('test_') > -1 ? 6 : 0, firstDigitLength)
        const lastDigits = text.substr(length - lastDigitLength, lastDigitLength)

        const lastText = `${firstDigits}....${lastDigits}`

        return length > lastText.length ? lastText : text
    }
    return `${text.substr(0, firstDigitLength)}...`
}
