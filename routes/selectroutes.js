const express = require('express');
const routerSelect = express.Router();
const bodyParser = require('body-parser')
//ミドルウェア
routerSelect.use(bodyParser.urlencoded({ extended: true }));

//Connection MySQL接続モジュール
const con  = require('../Connection/Connection');

//初回表示
routerSelect.get('/', (req, res) => {
	const sql = "select * from users";
	con.query(sql, function (err, result, fields) {  
	if (err) throw err;
	res.render('index',{users : result});
	});
});

// 初回登録フォーム　(スラッシュと+を使う /html)
//   app.get('/create', (req, res) => {
// 	  res.sendFile(__dirname + '/html/form.html')
// 	});

//初回登録フォーム　(スラッシュと+を使う /html)
routerSelect.get('/create', (req, res) => {
	res.render('form');
	});

module.exports = routerSelect;