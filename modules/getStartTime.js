//http://wandering-engineer.tech/2019/02/16/nodejs-exports-module-exports/

//現在の日付を取得する関数

let StartTime = function Time(){
		let Day = new Date();
		let Ye = Day.getFullYear()+"年 ";
		let Mo = Day.getMonth()+1+"月 ";
		let Da = Day.getDate()+"日 ";
		let Ho = Day.getHours()+"時 ";
		let Mi = Day.getMinutes()+"分 ";
		let Se = Day.getSeconds()+"秒";
		let Time =Ye+Mo+Da+Ho+Mi+Se;
		return Time;
	}
	//console.log('StartTime',StartTime());

module.exports = StartTime;

