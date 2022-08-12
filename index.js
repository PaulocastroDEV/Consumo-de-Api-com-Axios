const express = require("express");
const app= express();
const bodyParser= require("body-parser");

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

//banco de dados falso

var DB={
    games: [
        {
            id:23,
            title:"Call of duty MW",
            year:2019,
            price:60
        },
        {
            id:65,
            title:"Sea of thieves",
            year:2018,
            price:40
        },
        {
            id:2,
            title: "Minecraft",
            year:2012,
            price:20
        }
    ]
}
app.get('/games',(req, res)=>{
    res.status(200).json(DB.games)
})

app.get('/game/:id',(req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        var game= DB.games.find(g=> g.id==id);
        if(game != undefined){
            res.status(200).json(game)
        }else{
            res.sendStatus(404);
        }
    }
})
app.post('/game',(req,res)=>{
    var {title,price,year} = req.body;
    if(isNaN(price) || isNaN(year) || typeof title != "string"){
        res.sendStatus(400);
    }else{
        var game = req.body;
        DB.games.push({
            id:2325,
            title,
            price,
            year
        })
        res.status(200).json(game)
    }
}) 

app.delete('/game/:id',(req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        var index= DB.games.findIndex(g=> g.id==id);
        if(index == -1){
            res.sendStatus(404);
        }else{
            DB.games.splice(index,1);
            res.sendStatus(200);
        }
    }
})


app.listen(3000, ()=>{
    console.log("Api rodando");
})
