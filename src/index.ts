import express from "express";
import { getCurrencySymbols, convertCurrency, historicalRate } from "./services/exchangeRateService";
import 'dotenv/config'

const app = express();
const port = 3000; // default port to listen

interface RequestConvertCurrency {
    query: {
        baseCurrency: string,
        targetCurrency: string,
        amount: string
    }
}

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );

// creating a chache and calling the symbols currency
// Since this is just an exercise, I decided to go with a memory cache to store the symbols.
// In a real case scenario we would need to implement a more robust cache mechanism
let currencySymbolsCache: Record<string, string> | undefined

app.get( "/symbols", async ( req, res ) => {
    res.header("Access-Control-Allow-Origin", "*");
    if(!currencySymbolsCache) {
        currencySymbolsCache = await getCurrencySymbols()
    }
    res.send( currencySymbolsCache );
} );

app.get( "/convert", async ( req: RequestConvertCurrency, res ) => {
    res.header("Access-Control-Allow-Origin", "*");
    const { baseCurrency, targetCurrency, amount } = req.query
    res.send( await convertCurrency({ baseCurrency, targetCurrency, amount }) );
} );

// This could be also cached in a real case scenario, at least for the most used currencies (Euro, American Dollar, etc..)
app.get( "/timeseries", async ( req: RequestConvertCurrency, res ) => {
    res.header("Access-Control-Allow-Origin", "*");
    const { baseCurrency, targetCurrency } = req.query
    res.send( await historicalRate({baseCurrency, targetCurrency}) );
} );


