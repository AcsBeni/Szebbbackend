//---------------------------Users------------------------------
const express = require('express');
const router = express();
router.use(express.json()); //json formátum megkövetelése
  
const {users, getnextid, saveusers, isEmailValid} = require('../utils/store');
  
router.get("/:id",(req, res) => {
    let id = req.params.id;
    let idx = users.findIndex(user => user.id == id);
    
    if (idx>-1) {
      return res.send(users[idx]);
    }
    return res.status(400).send("Nincs ilyen id-jű user" );
  
});
  //Rest client hf
  //post new user
  
router.post("/",(req, res) => {
  
    let data = req.body;
    if(isEmailValid(data.email)) {
      return res.status(400).send({msg: "Már létező email cím"});
    }
    data.id = getnextid();
    users.push(data);
    saveusers();
    res.send({msg: "Sikeres regisztráció"});
   
});
  //Post check user login
router.post("/login",(req, res) => {
  
      let {email, password} = req.body;
      let loggeduser = {};
      users.forEach(user => {
      if(user.email == email && user.password == password) {
          loggeduser = user;
          return;
      }
    })
    res.send(loggeduser);
});
  
  //modify user
router.patch("/profile",(req, res) => {
    let data = req.body;
    let idx = users.findIndex(user => user.email == data.email);
    if (idx>-1) {
      users[idx] = data;
      saveusers();
      return res.send(users[idx]);
    }
    
  
  });
  
  
  
  //update user by id
router.patch("/:id",(req, res) => {
    if(isEmailValid(data.email)) {
      return res.status(400).send({msg: "Már létező email cím"});
    }
    let id = req.params.id;
    let data = req.body;
    let idx = users.findIndex(user => user.id == id);
    if (idx>-1) {
      users[idx] = data;
      users[idx].id = Number(id);
      return res.send('A felhasználó adatai frissítve lettek' );
    }
    return res.status(400).send("Nincs ilyen id-jű user" );
  });
  /*
  git add .
  git commit -m "commit lett"
  git push -u origin main      
  */
  //delete user by id
router.delete("/:id",(req, res) => {
    let id = req.params.id;
    let idx = users.findIndex(user => user.id == id);  
    if (idx>-1) {
      users.splice(idx,1);
      saveusers();
      return res.send(users);
    }
})
  //post check user login
router.patch('/users/profile', (req, res) => {
});
  
  //UPDATE profile (name, email)
router.patch('/profile/:id', (req, res) => {
    let id = Number(req.params.id)
    let data = req.body
    let idx = users.findIndex(user => Number(user.id) === id)
    if (idx > -1) {
        if (data.email && data.email != users[idx].email) {
            const existing = users.find(u => u.email === data.email && u.id != id);
            if (existing) {
                return res.status(400).json({ msg: "Ez az email már foglalt!" });
            }
            users[idx].email = data.email
        }
        if (data.name) users[idx].name = data.name
        saveusers()
        return res.send({ msg: "A felhasználó módosítva.", user: users[idx] })
    }
    return res.status(400).send({ msg: "Nincs ilyen azonosítójú felhasználó!" })
})
  
  //UPDATE password
router.patch('/passmod/:id', (req, res) => {
    let id = Number(req.params.id)
    let data = req.body
    let idx = users.findIndex(user => Number(user.id) === id)
    if (idx > -1) {
        if (data.oldpass && data.newpass) {
            if (data.oldpass != users[idx].password) {
                return res.status(400).send({ msg: "Hibás jelenlegi jelszó!" })
            }
            if (data.newpass === users[idx].password) {
                return res.status(400).send({ msg: "Az új jelszó nem lehet ugyanaz, mint a régi!" })
            }
            users[idx].password = data.newpass
            saveusers()
            return res.send({ msg: "A jelszó módosítva.", user: users[idx] })
        }
        return res.status(400).send({ msg: "Nincsenek meg a szükséges adatok!" })
    }
    return res.status(400).send({ msg: "Nincs ilyen azonosítójú felhasználó!" })
})
router.get("/",(req, res) => {
 
    res.send(users );
});

module.exports = router;