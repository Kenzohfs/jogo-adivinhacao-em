const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const sql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'jogo_adivinhacao'
})

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/public/pedido/dadosPessoais.html");
// });

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});