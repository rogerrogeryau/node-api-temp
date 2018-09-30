const request = require("request");
const express = require("express");

const app = express();

app.set("view engine","ejs");

app.get("/",function(req,res){
    //res.send("this is home page");
    res.render('home');
    
})


app.get("/results",function(req,res){
    // res.send("this is result page");
    // console.log(req.query.search);
    let searchWord = req.query.search;
    request('http://www.omdbapi.com/?s='+searchWord+'&apikey=thewdb', function (error, response, body) {
        if(!error && response.statusCode === 200){
            let parsedJSON = JSON.parse(body);
            // let arrayContent = parsedJSON.Search;
            // let item =""; 
            // arrayContent.forEach(function(el){
                // item+= el.Title;
                // item+= " ";
            // })
            // res.send(item);
            res.render("results",{parsedJSON:parsedJSON});
        }else{
            console.log("error");
        }
    });
})






app.listen(process.env.PORT, process.env.IP, function(){
    console.log("OMDI app is running...");
})