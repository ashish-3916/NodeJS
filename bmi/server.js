const express = require('express');
const bodyParser = require('body-parser');;

const app = express() ;

app.use(bodyParser.urlencoded({extended : true}));

app.get("/bmicalculator" , function(req , res)
{
    res.sendFile(__dirname + "/index.html");
});

app.post("/bmicalculator"  , function(req , res)
{
  var n1 = Number(req.body.height);
  var n2 = Number(req.body.weight);
  var result = n1/(n2*n2);
  res.send("Your BMI is : " + result);
});

app.listen(3000 , function()
{
  console.log("Hosted at LocalHost : 3000.");
});
