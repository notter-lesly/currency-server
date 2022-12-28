import { getSymbols, getExchangeRates, getHistoricalRates } from "../connectors/exchangeRateConnector"

export async function getCurrencySymbols(){

    const { symbols } = await getSymbols()
    return symbols
}

export async function convertCurrency({ baseCurrency, targetCurrency, amount }: { baseCurrency: string, targetCurrency: string, amount: string }){

    const { result } = await getExchangeRates({baseCurrency, targetCurrency, amount})
    return { result }
}

export async function historicalRate({baseCurrency, targetCurrency}: { baseCurrency:string, targetCurrency:string}){

    const dateNow = new Date();
    //Gets the today date and remove the hour.
    const endDate = dateNow.toISOString().split('T')[0];
    // Gets the today date, minus 30 days and and remove the hour.
    const startDate = new Date(dateNow.setDate(dateNow.getDate()-30)).toISOString().split('T')[0]

    const { rates } = await getHistoricalRates({baseCurrency, targetCurrency, startDate, endDate})

    const valuesByCurrency = Object.values(rates);
    const currencyValues = valuesByCurrency.map((currency) => currency[targetCurrency]);
    return { currencyValues }
}