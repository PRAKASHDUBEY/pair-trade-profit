const Stocks = require('../db/stocks.json');

function indexLimit(date){
    var dt = new Date(date.startDate);
    var dt2 = new Date(date.endDate);

    var dateArr = Stocks[0].DATE;

    
    let endIndex; let startIndex;

    for (let i = dateArr.length-1; i > 0; i--) {


        if (new Date(dateArr[i]) <= dt2) {
            endIndex = i; break;
        }
        

    }
    for (let i = 0; i < dateArr.length; i++) {


        if (new Date(dateArr[i]) >= dt) { 
            startIndex = i; break; 
        }
        
    }
    return{
        startIndex: startIndex,
        endIndex: endIndex
    }

}

module.exports = indexLimit