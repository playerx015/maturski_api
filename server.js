const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser  = require('body-parser')
// for server to know the real path in fs
const path = require('node:path');
const multer  = require('multer');

const db_akcije = require('./helpers/db_akcije');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());

const upload = multer({ dest: './slike' })


app.get('/api', (req, res) => {
    db_akcije.lokacije(res);
})

app.get('/api/:id', (req, res) => {
    db_akcije.lokacija(req, res);
})


app.post('/api', upload.single('slika'), (req,res) => {
    // fajl je dodat u request
    // console.log(req.file)
   db_akcije.sacuvajLokaciju(req, res);
})

app.post('/api/login', (req,res) => {
    db_akcije.logovanje(req, res);
})    

app.get('/slike/:filename', (req, res) => {
    const { filename } = req.params;
    const dirname = path.resolve();
    const fullfilepath = path.join(dirname, 'slike/' + filename);
    return res.sendFile(fullfilepath);
});


app.listen(process.env.PORT);
