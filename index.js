const express = require('express');
const app = express();
var cors = require('cors')
const request = require('request');
const async = require('async');

app.get('/country_fullName/:country', cors(), (req, res) => {
    var country = req.params.country.substring(1);
    var urlIS = 'https://restcountries.eu/rest/v2/name/'+ country+'?fullText=true';
    async.times(2, (i, callback) => {
        var options = {
            url: urlIS,
    } 
    request(options, (error, response, body) => {
        var result = JSON.parse(body, function (key, value) {
            if (key == "name") {
              return value.toUpperCase();
            } else {
              return value;
            }
          });
        callback(null, result);
    });
    }, (err, results) => {
        res.json(results);
    });
})

app.get('/country_partialName/:country', cors(), (req, res) => {
    var countries = req.params.country.substring(1);
    async.times(2, (i, callback) => {
    var options = {
        url: 'https://restcountries.eu/rest/v2/name/'+countries,
    } 
    request(options, (error, response, body) => {
        var result = JSON.parse(body, function (key, value) {
            if (key == "name") {
              return value.toUpperCase();
            } else {
              return value;
            }
          });

        var data = result;
        
        callback(null, result);
    });
    }, (err, results) => {
        res.json(results);
    });
})

app.get('/slot_machine/:coins', cors(), (req, res) => {
    var coins = req.params.coins.substring(1);
    let reel1 = ["cherry", "lemon", "apple", "lemon", "banana", "banana", "lemon", "lemon"]; 
    let reel2 = ["lemon", "apple", "lemon", "lemon", "cherry", "apple", "banana", "lemon"];
    let reel3 = ["lemon", "apple", "lemon", "apple", "cherry", "lemon", "banana", "lemon"];
    let spinOne = Math.floor(Math.random() * Math.floor(8));
    let spinTwo = Math.floor(Math.random() * Math.floor(8));
    let spinThree = Math.floor(Math.random() * Math.floor(8));
    async.times(1, (i, callback) => {
    request(coins, (error, response, body)=>{
        let reels = [reel1[spinOne], reel2[spinTwo], reel3[spinThree]];
        if(coins >= 1 ){
            coins = coins-1; 
            if( reels[0] === "cherry" && reels[1] === "cherry" && reels[2] === "cherry"){
                coins = coins+50;
            }
            if((reels[0] === "cherry" && reels[1] === "cherry") || (reels[1] === "cherry" && reels[2] === "cherry")||(reels[0] === "cherry" && reels[2] === "cherry")){
                coins = coins+40;
            }
            if( reels[0] === "apple" && reels[1] === "apple" && reels[2] === "apple"){
                coins = coins+20;
            }
            if((reels[0] === "apple" && reels[1] === "apple") || (reels[1] === "apple" && reels[2] === "apple")||(reels[0] === "apple" && reels[2] === "apple")){
                coins = coins+10;
            }
            if( reels[0] === "banana" && reels[1] === "banana" && reels[2] === "banana"){
                coins = coins+15;
            }
            if((reels[0] === "banana" && reels[1] === "banana") || (reels[1] === "banana" && reels[2] === "banana")||(reels[0] === "banana" && reels[2] === "banana")){
                coins = coins+5;
            }
            if( reels[0] === "lemon" && reels[1] === "lemon" && reels[2] === "lemon"){
                coins = coins+3;
            }
            let result = {reels, coins};
            callback(null, result);
        }else{
            callback(null, "Don't have coins");
        }
    });
    }, (err, results) => {
        res.json(results);
    });
})

app.listen('8010', () => {
    console.log('Listening on port 8010');
})
