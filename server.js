const express = require('express') 
const app = express() 
const db = require('./db');  

const personRouter = require('./routes/personroutes.js');  
const menuRouter = require('./routes/menuroutes.js') 

const bodyParser = require('body-parser') 
app.use(bodyParser.json()); 

app.use('/person',personRouter);  
app.use('/item',menuRouter);   


app.get('/',function(req,res){
   res.send('Hello World')  
})  

app.listen(3000,()=>{
    console.log('listening on port 3000')
}) 



