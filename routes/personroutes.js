const express = require("express");
const router = express.Router()  
const Person = require("./../person.js");  
const mongoose = require("mongoose"); // Add this line


router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
}); 


router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
}); 

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (err) {}
}); 

router.put('/:id', async (req, res)=>{
    const personId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(personId)) {
       return res.status(400).json({ error: "Invalid ID format" });
    }
    try {
    const updatedPerson = req.body;
    const response = await Person.findByIdAndUpdate(personId,updatedPerson,{
      new: true,
      runValidators: true,
    })

    if(!response){
        return res.status(404).json({error:'Person not found'}); 
    } 
    console.log("data updated"); 

    res.status(200).json(response);
  } 
  catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});  

router.delete('/:id',async (req,res)=>{ 
     const personId = req.params.id;
     if (!mongoose.Types.ObjectId.isValid(personId)) {
       return res.status(400).json({ error: "Invalid ID format" });
        }
    try{ 
        const response = await Person.findByIdAndDelete(personId); 
        if(!response){
            return res.status(404).json({error:'Person not found'}); 
        } 
        console.log('data delete') 
        res.status(200).json({message:'person deleted'})
    } 
    catch(err){
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router; 