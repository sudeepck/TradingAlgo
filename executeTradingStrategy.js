executeTradingStrategy =(tradeMarketData,threshold,averagePriceValue,accountBalance,str,brokeragebuyFee,brokerageSellFee) =>
{
    str +=`Date &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; Time &nbsp; &nbsp;&nbsp; BuyOrSell &nbsp;&nbsp; &nbsp;&nbsp;  avgPriceValue &emsp; current price &emsp; thresholdValue &emsp;  accountBalance &emsp; accountValue  &emsp; profitOrLoss <br/>`;
    let accountValue = accountBalance;
    let unchangedinitialBalance = accountBalance;
   let data =  tradeMarketData.map(trade=>trade);
   let sellingPrice = 0 ,purchasePrice = 0 ,numShares = 0,buyed = 0;
   let numberofpurshaced = 0,numberofSelled =    0
       let previousBuyedValue = 0;
    let profit = 0;
   
    let tradingResult = data.map(x=>{
       
    let currentPriceValue = (parseInt(x.High) + parseInt(x.Low))/2
    let priceDifference = Math.abs(currentPriceValue - averagePriceValue);
        // if sell  else buy
        if (priceDifference > threshold && buyed == 1 && previousBuyedValue < currentPriceValue) {
            flag = 1;
            sellingPrice += currentPriceValue;
            let brokeageFeeForSell = Math.min(brokerageSellFee[1].amount ,(currentPriceValue * brokerageSellFee[0].percentage));

            

            accountBalance += currentPriceValue -brokeageFeeForSell
            accountValue = accountBalance -brokeageFeeForSell
            numShares++;
            buyed --;
            numberofSelled++;   
            profit = previousBuyedValue < currentPriceValue ? "profit" :"loss";

            str +=`${x.Date} &nbsp; &nbsp; ${x.Time} &nbsp; &nbsp; SELL&emsp;&emsp;&emsp;&emsp;&emsp;${[averagePriceValue]} &emsp;&emsp;&emsp;&emsp;${[Math.floor(currentPriceValue)]} &emsp;&emsp;&emsp;&emsp; ${[threshold]} &emsp;&emsp;&emsp;&emsp;&emsp;  ${[Math.floor(accountBalance)]} &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;${[Math.floor(accountValue)]} &emsp; ${profit} <br/>`
            return {[x.Date] : "it's time to Sell the stock "}
        } else if (priceDifference < threshold && accountBalance >= currentPriceValue && buyed == 0) {
            previousBuyedValue = currentPriceValue;//94

            let brokeageFeeForBuy = Math.min(brokeragebuyFee[1].amount,(currentPriceValue * brokeragebuyFee[0].percentage));
          
    
            accountBalance -= currentPriceValue -brokeageFeeForBuy
            accountValue = accountBalance + currentPriceValue -brokeageFeeForBuy

            numShares++;
            buyed++;
            numberofpurshaced++;
            flag =1;
              str +=`${x.Date} &nbsp; &nbsp; ${x.Time} &nbsp; &nbsp; BUY&emsp;&emsp;&emsp;&emsp;&emsp;${[averagePriceValue]} &emsp;&emsp;&emsp;&emsp;${[Math.floor(currentPriceValue)]} &emsp;&emsp;&emsp;&emsp; ${[threshold]} &emsp;&emsp;&emsp;&emsp;&emsp; ${[Math.floor(accountBalance)]} &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;${[Math.floor(accountValue)]} <br/>`
            return {[x.Date] : "it's time to buy the stock "}
        } else {
            flag = 0;
            return {[x.Date] : `Price difference is within the threshold (${priceDifference}), no action taken. or no stocks buyed yet`};
        }
    })

    let finalBalance = accountBalance;
    console.log("numberofpurshaced = " + numberofpurshaced + "\t" + "numberofSelled ="  +numberofSelled )
    console.log("initialBalance = " +  unchangedinitialBalance +"\t"+ "finalBalance = " +  finalBalance);

   return str;
}


module.exports = {executeTradingStrategy}











