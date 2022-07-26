const express = require('express');
const mysql = require('mysql');

//CREATE CONNECTION
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'nodesql'
});

//CONNECT
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log("Mysql connected ...");
});

const app = express();
let db_name = "nodesql"
//HOW TO CREATE ROUTES WITH EXPRESS
app.get('/createdb', (req, res) => {
    let sql = `CREATE DATABASE IF NOT EXISTS ${db_name}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});
//CREATE TABLES
app.get('/createtable1', (req, res) => {
    let sql = `CREATE TABLE IF NOT EXISTS posts(
        id int AUTO_INCREMENT,
        title varchar(255), 
        body varchar(255),
        PRIMARY KEY (id)
        )`;
    db.query(sql, (err, result) => {
        if(err) throw err
        console.log(result);
        res.send("Table created...")

    })
});

//INSERT POST ONE
let posts = {
        title: "Post 1",
        body: "This is my first post message"
    }

app.get('/insertpost1', (req, res) => {
    let sql = `INSERT INTO posts SET ?`;
    let query = db.query(sql, posts, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("Posts inserted...");
    })
});



app.listen('3000', () => {
    console.log('server started on port 3000');
});