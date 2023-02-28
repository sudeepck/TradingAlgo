//https://docs.google.com/spreadsheets/d/10VTlKKOG5bxZZwF6uxvsQ1waOr5Xe7-sX80ALLEDbLs/edit#gid=0
const express = require('express')
const app = express()
const path = require('path');
const {executeTradingStrategy} = require('./executeTradingStrategy')
const fs = require('fs');

app.get('/',(req,res)=>{
    res.send("Trading Platform")
})

app.get('/trading',async(req,res)=>{
    const { companyTiker, averagePrice,threshold}= req.query

    let filename = `./NiftyDataset.json`
    let str = "";
    let thresholdValue = parseInt(threshold); 
    let averagePriceValue = parseFloat(averagePrice) // example reference price 0.7 96.5  11947.4
    let accountBalance = 100000; 
     let brokerageBuyFee = [{percentage:0.03},{amount :20}]
    let brokerageSellFee = [{percentage:0.03},{amount :20}]

    let tradeMarketData ;
    fs.readFile(filename, (err, data) => {
        if (err) throw err;
        tradeMarketData = JSON.parse(data);
        let str1 = executeTradingStrategy(tradeMarketData,thresholdValue,averagePriceValue,accountBalance,str,brokerageBuyFee,brokerageSellFee);
       console.log(str1)
        res.send(str1);
    });
})

app.listen(3000,()=>{
    console.log("Connected to server");
})