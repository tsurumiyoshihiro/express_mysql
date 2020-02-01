const express = require('express');
var app = express();
const routerInsert = express.Router();
const bodyParser = require('body-parser');
//@hapi/joi
const Joi = require('@hapi/joi');
//const Joi = require('joi-browser'); 

const fs = require('fs')
//ミドルウェア
routerInsert.use(bodyParser.urlencoded({ extended: true }));

//Connection MySQL接続モジュール
const con  = require('../Connection/Connection');

//validate validateモジュール
const validates  = require('../validate/validates');
//insert
routerInsert.post('/insert', (req, res) => {
     let result = validates(req.body.name); 
    //let result = schema.validate(req.body.name,schema, { abortEarly: false });

    /*email
     const schemaEmail = Joi.object({
       email: Joi.string().email()
   });
   let resultEmail = schemaEmail.validate({email:req.body.email});
  */

    // if (resultEmail.error) {
    //   // console.log('resultEmail.error.details',resultEmail.error.details)
    //   // console.log('resultEmail.error',resultEmail.error)
    //   return res.render('error',
    //   {errorEmail : '「メールアドレス」は有効でなければなりません」 ○○○@gmail.com',
    //    use : req.body}
    //    );
    // }
    
    if (result.error) {
        switch (result.error.details[0].type){
            case 'string.min':
                return res.render('error',
                {error : '入力は3文字以上です。',
                 use : req.body}
                 );
              case 'string.max':
                return res.render('error',
                {error : '入力は10文字以下です。',
                 use : req.body}
                 );
              case 'string.empty':
                return res.render('error',
                {error : '入力必須です',
                 use : req.body}
                 );
        }
    }else{
        const sql = "INSERT INTO users SET ?"
        con.query(sql,req.body,function(err, result, fields){
           if (err) throw err;
           res.redirect('/');
        });
      }
    });

    app.use((req,res,next)=>{
      let now = new Date();
      let log = `${now}:${req.method} ${req.url}`;
      console.log(log);
      //saver.logに書き出す
      fs.appendFile("../server.log",log + "\n",err =>{
        if (err){
          console.log(err);
        }
      });
      next();
    });

module.exports = routerInsert;