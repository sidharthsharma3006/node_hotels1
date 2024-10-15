const mongoose = require('mongoose') 
const mongoURL = `mongodb://localhost:27017/hotels`  

mongoose.connect(mongoURL,{
    useNewUrlParser: true, 
    useUnifiedTopology: true
}) 

const db = mongoose.connection; 

db.on('connected',()=>{
    console.log('Connected to MongoDB server'); 
}) 

db.on('disconnected', () => {
  console.log("Disconnected MongoDB server");
}); 

db.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
});


module.exports = db; 


