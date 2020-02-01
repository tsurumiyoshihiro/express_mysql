const express = require('express');
const routerDelete = express.Router();
const bodyParser = require('body-parser')
//ミドルウェア
routerDelete.use(bodyParser.urlencoded({ extended: true }));

//Connection MySQL接続モジュール
const con  = require('../Connection/Connection');

    //delete確認
    routerDelete.get('/delete/:id',(req,res)=>{
        const sql = "SELECT * FROM users WHERE id = ?";
        con.query(sql,[req.params.id],function (err, result, fields) {  
            if (err) throw err;
            res.render('delete',{user : result});
            });
    });
    
    //delete
    routerDelete.delete('/delete/:id',(req,res)=>{
        const sql = "DELETE FROM users WHERE id = ?";
        con.query(sql,[req.params.id],function(err,result,fields){
            if (err) throw err;
            res.redirect('/');
        })
    });

module.exports = routerDelete;