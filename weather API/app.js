const express = require('express');
const bodyParser = require("body-parser");
const https = require('https');
const app= express();

app.use(bodyParser.urlencoded({extended : true}));
app.get('/' , function(req , res)
{
  res.sendFile(__dirname + "/index.html");
});
app.post('/' , function(req , res){
  console.log("query recieved");
  var mycity = req.body.city;
  const url ="https://api.openweathermap.org/data/2.5/weather?q="+mycity+"&appid=ce3cc5a7c7d4c5593277f682cec0e2ec&units=metric";
  https.get(url , function(response){
      console.log(response.statusCode);
      response.on('data', function(data){
          const weatherData = JSON.parse(data); // data in form of hex decimal
          const temp =  weatherData.main.temp;
          const description = weatherData.weather[0].description;
          const icon = weatherData.weather[0].icon;
          const imgURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
          res.write("<h1>The temperature at "+mycity+" is "+temp +" degrees with "+ description +"</h1>");
          res.write("<img src ="+imgURL+">");
          res.send();
        });
    });
});

app.listen(3000 , function(){
  console.log("hosted at LocalHost 3000");
});
