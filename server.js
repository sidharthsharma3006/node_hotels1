const express = require('express') 
const app = express() 
const db = require('./db');  
require('dotenv').config();
const personRouter = require('./routes/personroutes.js');  
const menuRouter = require('./routes/menuroutes.js') 

const bodyParser = require('body-parser') 
app.use(bodyParser.json()); 

app.use('/person',personRouter);  
app.use('/item',menuRouter);   


app.get('/',function(req,res){
   res.send('Hello World')  
})  
const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log('listening on port 3000')
}) 



