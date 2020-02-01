const mysql = require('mysql');

const dbConfig = {
    host: 'localhost',
    poot: '3306',
    user: 'root',
    password: 'Tsurumi24',
    database:'express_db'
}

const connection = mysql.createConnection(dbConfig);

//接続確認
connection.connect(function(err) {
	if (err) throw err;
	console.log('DB接続成功!');
});

module.exports = connection;