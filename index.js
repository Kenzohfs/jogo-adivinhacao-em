const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const sql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'jogo_adivinhacao'
})

sql.query('create table if not exists jogador (id int primary key auto_increment, nome varchar(100) not null, pontos int not null);');

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/html/home.html");
})

app.get("/jogo", (req, res) => {
    res.sendFile(__dirname + "/public/html/jogo.html");
})

app.get("/ranking", (req, res) => {
    res.sendFile(__dirname + "/public/html/ranking.html");
})

app.get("/get-ranking", (req, res) => {
    sql.query("select * from jogador order by pontos desc", (error, results, fields) => {
        res.json(results);
    })
})

app.post('/criar_jogador', (req, res) => {
    sql.query("insert into jogador (nome, pontos) values(?, ?)", [req.body.nome, 0]);
    sql.query("SELECT LAST_INSERT_ID();", (error, results, fields) => {
        res.json(results[0]['LAST_INSERT_ID()']);
    })
})

app.get("/get_jogador_by_id/:id", (req, res) => {
    sql.query("select * from jogador where id = ?", [req.params.id], (error, results, fields) => {
        res.json(results[0]);
    })
})

app.put("/salvar_pontuacao", (req, res) => {
    console.log("req.body: ", req.body)
    sql.query("update jogador set pontos = ? where id = ?", [req.body.pontos, req.body.id], (error, results, fields) => {
        res.json(results);
    });
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});