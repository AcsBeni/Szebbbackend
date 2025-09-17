const fs = require('fs');
const path = require('path');

const STEPS_FILE = path.join(__dirname,'..','database','steps.json');
const USERS_FILE = path.join(__dirname,'..','database','users.json');

let steps = []
let users =[]
loadsteps();
loadusers();

function initStore() {
    loadsteps();
    loadusers();
}
// -----------------------------------Functions------------------------------------


function savesteps() {
    fs.writeFileSync(STEPS_FILE,JSON.stringify(steps));
}
  function loadsteps() {
    if(fs.existsSync(STEPS_FILE)) {
      const raw = fs.readFileSync(STEPS_FILE);
      try {
        steps = JSON.parse(raw);
      }
      catch(err) {
        console.error(err);
        steps = [];
      }
    }
    else {
      saveusers();
    }
} 
  function getnextstepid() {
    let nextid = 1;
    if(steps.length==0) {
      
      return nextid;
    }
    let maxid = 0;
    for (let i=0; i<steps.length; i++) {
      if(steps[i].id>steps[maxid].id) {
        maxid = i;
      }
      
    }
    return steps[maxid].id+1;
}
function loadusers() {
    if(fs.existsSync(USERS_FILE)) {
      const raw = fs.readFileSync(USERS_FILE);
      try {
        users = JSON.parse(raw);
      }
      catch(err) {
        console.error(err);
        users = [];
      }
    }
    else {
      saveusers();
    }
}
function saveusers() {
    fs.writeFileSync(USERS_FILE,JSON.stringify(users));
}
function getnextid() {
    let nextid = 1;
    if(users.length==0) {
      
      return nextid;
    }
    let maxid = 0;
    for (let i=0; i<users.length; i++) {
      if(users[i].id>users[maxid].id) {
        maxid = i;
      }
      
    }
    return users[maxid].id+1;
}
  
  
function isEmailValid(email) {
    let exist = false;
    users.forEach(user => {
      if(user.email == email) {
        exist = true;
      }
    });
    return exist;
}
  
module.exports = {
    initStore,
    getnextid,
    getnextstepid,
    isEmailValid,
    savesteps,
    loadsteps,
    saveusers,
    loadusers,
    steps,
    users
};