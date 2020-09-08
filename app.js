const express = require("express");
const app = express();
const https = require("https");

app.get("/", function(req, res){
    const query = "London";
    const apiKey = "apikey";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units="+unit;

    https.get(url,function(response){
        console.log(response.statusCode);
        if(response.statusCode!=200){
            res.send("<img src=https://http.cat/"+response.statusCode+">");
        }else{
            response.on("data", function(data){
            
            
                const weatherData = JSON.parse(data);
                //console.log(weatherData);
                const temp = weatherData.main.temp;
                console.log(temp);
                //[0] porque es un array con un solo item
                const weatherDescription = weatherData.weather[0].description;
                console.log(weatherDescription);
                const icon = weatherData.weather[0].icon;
                const iconImageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
                res.write("<p><h3>The weather is currently "+weatherDescription+"</h3></p>");
                res.write("<h1>The temperature in london is "+temp+" degrees celsius</h1>");
                res.write("<img src="+iconImageURL+">")
                res.send();
            });
        }
    });
});


app.listen(3000, function(){
    console.log("Server is running on port 3000");
});