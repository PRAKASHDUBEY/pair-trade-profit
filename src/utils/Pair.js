class Pair {
    constructor(pair1, pair2, closingPrice1, closingPrice2, date, correlation, rsi1, rsi2, profit, period) {
        this.pair1 = pair1;
        this.pair2 = pair2;
        this.profit = profit;
        this.correlation = correlation;
        this.closingPrice1 = closingPrice1;
        this.closingPrice2 = closingPrice2;
        this.rsi1 = rsi1;
        this.rsi2 = rsi2;
        this.date = date;
        this.period = period
    }

}

module.exports = Pair;