const express = require("express");
const app = express();
const https = require("https");

app.get("/", function(req, res){
    const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=ApiKey&units=metric";

    https.get(url,function(response){
        console.log(response.statusCode);
        
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            //console.log(weatherData);
            const temp = weatherData.main.temp;
            console.log(temp);
            //[0] porque es un array con un solo item
            const weatherDescription = weatherData.weather[0].description;
            console.log(weatherDescription);
            res.write("<p><h3>The weather is currently "+weatherDescription+"</h3></p>");
            res.write("<h1>The temperature in london is "+temp+"C°</h1>");
            res.send();
        });
    });
});


app.listen(3000, function(){
    console.log("Server is running on port 3000");
});