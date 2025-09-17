const express = require('express');
const app = express();
var cors = require('cors');
const {initStore} = require('./utils/store');

const userRoutes = require('./modules/users');
const stepRoutes = require('./modules/steps');
//middleware
app.use(cors());
app.use(express.json()); //json formátum megkövetelése
app.use(express.urlencoded({ extended: true })); // req.body használata

app.get("/",(req, res) => {
 
  res.send('Bajai SZ Türr István Technikum - 13.a Szoftverfejlesztő' );
});

app.use("/users", userRoutes);
app.use("/steps", stepRoutes);


app.listen(3000, () => {
  console.log('Server is running on port 3000 http://localhost:3000');
});

