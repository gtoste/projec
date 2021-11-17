var express = require("express")
var app = express()
var path = require("path")
var PORT = process.env.PORT || 3000;


let form = ""
let inptType = ""
let users = [
    {nick:"111", email:"111@w.pl"},
    {nick:"222", email:"222@w.pl"},
    {nick:"333", email:"333@w.pl"}
 ]

app.get("/", function(req, res){
     res.sendFile(path.join(__dirname + "/static/addUser.html"))
 })

 app.get("/handleForm", function(req, res){
     let flag = true;
    for(let i = 0; i < users.length; i++)
    {
        if(users[i].email == req.query.em)
        {
            flag = false;
        }
    }
    if(flag)
    {
    users.push(Object({nick: req.query.n , email: req.query.em}))
    res.send(JSON.stringify(users))  
    }
    else{
        res.send("Użytkownik już istnieje")  
    }
})

app.get("/removeUserBySelect", function(req, res){
    inptType = ""
    inptType += `<select name="s" id="select">`
    for(var i = 0; i < users.length; i++)
    {
        inptType += `<option value="${users[i].email}">${users[i].email}</option>`;
    }
    inptType += `</select>`

    let str=`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="css/style.css">
        <title>Document</title>
    </head>
    <body>
        <div class = "s">
        <form action ="/removeUser" method="GET">
        ${inptType}   
        <button type="submit">goooooooooo</button>
    </form>
        </div>
    </body>
    </html>
`

    res.send(str)  
})


app.get("/removeUserByRadio", function(req, res){
    inptType = ""
    for(var i = 0; i < users.length; i++)
    {
        inptType += `<input type="radio" name="s" value="${users[i].email}">${users[i].email}<br/>`;
    }

    let str=`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="css/style.css">
        <title>Document</title>
    </head>
    <body>
        <div class = "s">
        <form action ="/removeUser" method="GET">
        ${inptType}   
        <button type="submit">goooooooooo</button>
    </form>
        </div>
    </body>
    </html>
`

    res.send(str)  
})

app.get("/removeUserByCheckBox", function(req, res){
    inptType = ""
    for(var i = 0; i < users.length; i++)
    {
        inptType += `<input type="checkbox" name="s" value="${users[i].email}">${users[i].email}<br/>`;
    }

    let str=`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="css/style.css">
        <title>Document</title>
    </head>
    <body>
        <div class = "s">
        <form action ="/removeUser2" method="GET">
        ${inptType}   
        <button type="submit">goooooooooo</button>
    </form>
        </div>
    </body>
    </html>
`

    res.send(str)  
})

app.get("/removeUser", function(req, res){
    var removed = "";
    for(var i = 0 ; i < users.length; i++)
    {
        if(users[i].email == req.query.s)
        {
           removed = JSON.stringify(users.splice(i,1))
        }
    }
    res.send("Usunięto: " + removed)  
})

app.get("/removeUser2", function(req, res){
    var removed = "";
    for(var i = 0 ; i < users.length; i++)
    {
        for(var j = 0; j < req.query.s.length; j++)
        {
            if(users[i].email == req.query.s[j])
            {
                removed += JSON.stringify(users.splice(i,1))
            }
        }
        
    }
    res.send("Usunięto: " + removed)  
})




app.use(express.static('static'))
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT )
})

