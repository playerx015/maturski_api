const mysql = require('mysql');
const hash = require('./hash');

const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'api_pract'
});

module.exports = {
    lokacije: res => {
        db.query("SELECT * FROM lokacija ORDER BY vreme_unosa DESC", (err, rows) => { 
            res.send(rows);
        })
    },
    lokacija:(req, res) => {
        db.query(`SELECT * FROM lokacija WHERE id_lokacije= ${req.params.id}`, (err, rows) => { 
            res.send(rows[0]);
        })
    },
    sacuvajLokaciju: (req,res) => {
        const sql = `INSERT INTO lokacija(ime,lokacija,tekst,slika,kratak_opis,kordinata_x,kordinata_y) VALUES('${req.body.ime}', '${req.body.lokacija}', '${req.body.tekst}',
        '${req.file.filename}', '${req.body.kratak_opis}', '${req.body.kordinata_x}','${req.body.kordinata_y}')`;
        console.log(sql)
        db.query(sql, (err, rows) => {
            res.send({status: "ok"});
        })
    },
    logovanje: (req, res) => {
        const sql = `Select * from korisnik where ime = "${req.body.ime}" AND lozinka = "${req.body.lozinka}"`;
        db.query(sql, (err, rows) => 
        {
            if(rows?.length == 1)
            {
                res.send({status: "ok", apiKey: hash(req.body.ime)});
            } else {
                res.send({status: "error"});
            }
        })
    }
}