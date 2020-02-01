//参考サイト　https://reffect.co.jp/node-js/express-js-connect-mysql
//npx nodemon server.js     
const express = require('express')
//bodyダグをrequest jsonファイルに追加してくれる
const bodyParser = require('body-parser')
const app = express()
const port = 3000
//const mysql = require('mysql')
const hbs = require('hbs')
//log出力
const fs = require('fs')

//method put deleteを利用できるように
const connect  = require('connect');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

//@hapi/joi
const Joi = require('@hapi/joi');

//routesフォルダを参照 外部ファイル利用
//「app.use(‘/’, ルーティング処理用オブジェクト)」の形
//第1引数には「基準となるパス」をセット
//第2引数には「オブジェクト」

//select module
const selectroutes = require('./routes/selectroutes')
app.use("/",selectroutes);

//update module
const updateroutes = require('./routes/updateroutes')
app.use("/",updateroutes);

//DELETE module 
const deleteroutes = require('./routes/deleteroutes')
app.use("/",deleteroutes);

//INSERT module 
const insertroutes = require('./routes/insertroutes')
app.use("/",insertroutes);

//ミドルウェア
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'hbs');

//htmlコードをまとめる
hbs.registerPartials(__dirname + "/views/partials");

//getCurrentYear 関数　module化
//参照したいパスを指定　中身はmodule.exportsしたもの
let getStartTime = require('./modules/getStartTime')
//console.log('getStartTime',getStartTime());
//現在時間　
hbs.registerHelper("getStartTime",getStartTime);
// //関数をまとめる
//現在時間
// hbs.registerHelper("getCurrentYear",()=>{
// 	let Day = new Date();
// 	let Ye = Day.getFullYear()+"年 ";
// 	let Mo = Day.getMonth()+1+"月 ";
// 	let Da = Day.getDate()+"日 ";
// 	let Ho = Day.getHours()+"時 ";
// 	let Mi = Day.getMinutes()+"分 ";
// 	let Se = Day.getSeconds()+"秒";
// 	let CurrentTime =Ye+Mo+Da+Ho+Mi+Se
// 	return CurrentTime;
// });

//機能追加 ログ書き出し
app.use((req,res,next)=>{
	let now = new Date();
	let log = `${now}:${req.method} ${req.url}`;
	console.log(log);
	//saver.logに書き出す
	fs.appendFile("server.log",log + "\n",err =>{
		if (err){
			console.log(err);
		}
	});
	next();
});
 
//サーバ実行
app.listen(port, () => 
console.log(`サーバ起動中 ポート番号 ${port}!`))