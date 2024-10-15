const express = require("express");
const router = express.Router();
const Menu = require("./../menu.js"); 

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newItem = new Menu(data);
    const response = await newItem.save();
    console.log("Data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Menu.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:tastetype",async (req,res)=>{
    try{
      const tasteType = req.params.tastetype;  
      if(tasteType=='salty'||tasteType=='sour'||tasteType=='spicy'||tasteType=='sweet'){
        const response = await Menu.find({taste:tasteType}); 
        res.status(200).json(response);
      } 
      else{ 
        res.status(404).json({ error: "Invalid work type" });
      }
    }  
    catch(err){

    }
});


module.exports = router; 
