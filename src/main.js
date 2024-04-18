const indicators = require('technicalindicators');
const correlationCoefficient = require('./utils/correlation.js');
const indexLimit = require('./utils/indexLimits.js')
const Stocks = require('./db/stocks.json');
const netProfit = require('./utils/profit.js');
const Pair = require('./utils/Pair.js')


function main(date) {
    let index = indexLimit(date);
    const FilterPair = [];

    let i = 0;
    while (i < 50) {
        let j = i + 1;
        while (j < 50) {
            let pair1 = Stocks[i];
            let pair2 = Stocks[j];
            let closingPrice1 = pair1.CLOSE.slice(index.startIndex, index.endIndex+1);
            let closingPrice2 = pair2.CLOSE.slice(index.startIndex, index.endIndex+1);
            let date = pair1.DATE.slice(index.startIndex, index.endIndex+1);
            
            let correlation = correlationCoefficient(closingPrice1, closingPrice2, closingPrice2.length);
            correlation = parseFloat(correlation).toFixed(3);

            //Filter Pair
            if (correlation >= 0.7) {

                let cP1 = pair1.CLOSE.slice(index.startIndex-14, index.endIndex+1);
                let cp2 = pair2.CLOSE.slice(index.startIndex-14, index.endIndex+1);

                const inputRSI1 = {
                    values: cP1,
                    period: 14
                };
                const inputRSI2 = {
                    values: cp2,
                    period: 14
                };
                const rsi1 = indicators.RSI.calculate(inputRSI1);
                const rsi2 = indicators.RSI.calculate(inputRSI2);



                let trade = netProfit(rsi1, rsi2, closingPrice1, closingPrice2, 0, closingPrice2.length-1);
                const pairdata = new Pair(pair1.Symbol, pair2.Symbol, closingPrice1, closingPrice2, date, correlation, rsi1, rsi2, trade.value, trade.period);
                FilterPair.push(pairdata);
            }
            j++;
        }
        i++;
    }

    FilterPair.sort((a, b) => b.profit - a.profit)
    const topPairs = FilterPair.splice(0,20);
    topPairs.forEach((x, i) => x.rank = i + 1);
    return topPairs;
}


module.exports = main;