const express = require('express');
const router = express();
router.use(express.json()); //json formátum megkövetelése

const {users, steps, getnextstepid, savesteps} = require('../utils/store');

//get all steps
router.get("/",(req, res) => {
    res.send();
});
  
  
  //get all  by user
router.get("/user/:uid",(req, res) => {
    let uid = req.params.uid;
    let idx = users.findIndex(user => user.id == uid);
    if (idx==-1) {
      return res.status(400).send("Nincs ilyen id-jű user" );
    }
    
    res.send(steps.filter(step => step.userid == uid));
  
    
});
  
  //GET one step by id
router.get("/:id",(req, res) => {
    let id = req.params.id;
    let idx = steps.findIndex(step => step.id == id);
    if (idx>-1) {
      return res.send(steps[idx]);
    }
    return res.status(400).send("Nincs ilyen id-jű lépésszám" );
});
  
  //POST new step
router.post("/",(req, res) => {
  
    let data = req.body;
    data.id = getnextstepid();
    steps.push(data);
    savesteps();
    res.send({msg: "Lépésszám rögzítve"});
    
});
  
  
  
  
  //PATCH step by id
router.patch("/:id",(req, res) => {
    let id = req.params.id;
    let data = req.body;
    let idx = steps.findIndex(step => step.id == id);
    if (idx>-1) {
      
      steps[idx] = data;
      steps[idx].id = Number(id);
      savesteps();
      return res.send('A lépésszám adatai frissítve lettek' );
    }
    return res.status(400).send("Nincs ilyen id-jű lépésszám" );
});
  
  
  //DELETE step by id
router.delete("/:id",(req, res) => {
    let id = req.params.id;
    let idx = steps.findIndex(step => step.id == id);
    if (idx>-1) {
      steps.splice(idx,1);
      savesteps();
      return res.send(steps);
    }
})
  
  //Delete all steps by user
router.delete("/user/:uid",(req, res) => {
    let uid = req.params.uid;
    let idx = users.findIndex(user => user.id == uid);
    if (idx==-1) {
      return res.status(400).send("Nincs ilyen id-jű user" );
    }
    steps = steps.filter(step => step.userid != uid);
    savesteps();
    return res.send(steps);
});
  
  
  //Delete all steps of users
router.delete("/",(req, res) => {
    steps = [];
    savesteps();
    return res.send(steps);
});

module.exports = router;
  