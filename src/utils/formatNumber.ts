import { replace } from 'lodash';
import numeral from 'numeral';

export function fCurrency(number: number): string {
    const integerFormat = '0,0';
    const decimalFormat = '0,0.00';
    
    // Retorna el formato adecuado basado en si el número es entero o decimal
    return 'Q'+ numeral(number).format(Number.isInteger(number) ? integerFormat : decimalFormat);
}

export function fPercent(number: number): string {
    return numeral(number / 100).format('0.0%');
}

export function fNumber(number: number): string {
    return numeral(number).format();
}

export function fShortenNumber(number: number): string {
    return replace(numeral(number).format('0.00a'), '.00', '');
}
