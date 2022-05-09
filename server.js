const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'api_pract'
})

const port = 3005;
const app = express();
app.use(express.json());
app.use(cors());


app.get('/api', (req, res) => {
    connection.query("SELECT * FROM lokacija", (err, rows) => { 
        res.send(rows);
    })
})

app.get('/api/:id', (req, res) => {
    connection.query(`SELECT * FROM lokacija WHERE id_lokacije= ${req.params.id}`, (err, rows) => { 
        res.send(rows);
    })
})


app.post('/api', (req,res) => {
    connection.query(`INSERT INTO lokacija(ime,lokacija,tekst,slika,kratak_opis) VALUES('${req.body.ime}', '${req.body.lokacija}', '${req.body.tekst}',
     '${req.body.slika}', '${req.body.kratak_opis}')`, (err, rows) => {
        
        res.sendStatus(200);
        
     })
    })


app.listen(port);
