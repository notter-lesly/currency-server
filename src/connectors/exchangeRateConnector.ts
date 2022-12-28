import got from 'got';

interface ResponseSymbols {
    success: boolean
    symbols: Record<string, string>,
}

interface ResponseExchangeRate {
    success: boolean,
    query: {
        from: string,
        to: string,
        amount: number
    },
    date: string,
    result: number,
}

interface ResponseHistoricalRate {
    rates: Record<string, Record<string, number>>
}


export async function getSymbols(){
    const response: ResponseSymbols = await got.get(`https://api.apilayer.com/exchangerates_data/v1/symbols`, {
        headers: {
            apikey: process.env.EXCHANGERATE_APIKEY
        }
    }).json()
    return response
}


export async function getExchangeRates({baseCurrency, targetCurrency, amount}: {baseCurrency: string, targetCurrency: string, amount: string }){
    const response: ResponseExchangeRate = await got.get(`https://api.apilayer.com/exchangerates_data/v1/convert`, {
        headers: {
            apikey: process.env.EXCHANGERATE_APIKEY
        },
        searchParams: {
            from: baseCurrency,
            to: targetCurrency,
            amount
        }
    }).json()
    return response
}


export async function getHistoricalRates({baseCurrency, targetCurrency, startDate, endDate}: { baseCurrency:string, targetCurrency:string, startDate: string, endDate: string }){
    const response: ResponseHistoricalRate = await got.get(`https://api.apilayer.com/exchangerates_data/v1/timeseries`, {
        headers: {
            apikey: process.env.EXCHANGERATE_APIKEY
        },
        searchParams: {
            from: baseCurrency,
            to: targetCurrency,
            start_date: startDate,
            end_date: endDate
        }
    }).json()
    return response
}

