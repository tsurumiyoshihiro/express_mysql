const express = require('express');
const routerupdate = express.Router();
const bodyParser = require('body-parser')
//ミドルウェア
routerupdate.use(bodyParser.urlencoded({ extended: true }));

//Connection MySQL接続モジュール
const con  = require('../Connection/Connection');

    //update確認
    routerupdate.get('/edit/:id',(req,res)=>{
        const sql = "SELECT * FROM users WHERE id = ?";
        con.query(sql,[req.params.id],function (err, result, fields) {  
            if (err) throw err;
            res.render('edit',{user : result});
            });
    });
    
    //update
    routerupdate.put('/update/:id',(req,res)=>{
         const sql = "UPDATE users SET ? WHERE id = " + req.params.id;
        con.query(sql,req.body,function (err, result, fields) {  
            if (err) throw err;
            res.redirect('/');
            });
    });

module.exports = routerupdate;