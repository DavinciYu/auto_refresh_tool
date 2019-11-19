const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);
const io = require('socket.io').listen(server);

server.listen(8080, ()=>{
    console.log("服务已开启");
}); 

// 给io绑定事件
let connected = false;
let fisrtOpen = new Promise((resolve, reject)=>{
	io.on('connection', (socket) => {
		if(!connected) {
			// socket.on('reload', (msg) => {

		    // })
		    io.emit('refreshCode', ''); 
		   	connected = true;
		}
		resolve(false);
	})
	setTimeout(function() {
		reject(true); 
	}, 5000);
});

const config = require('./config');

fisrtOpen.then(()=>{}).catch(()=>{
	// 自动打开浏览器
	// 可以使用exec 来执行系统的默认命令；child_process为内置模块 
	const {exec} = require("child_process");
	// //传入url
	var baseUrl = config.host;
	switch (process.platform) {
	    //mac系统使用 一下命令打开url在浏览器
	    case "darwin":
	        exec(`open ${baseUrl}`);
	        break;
	    //win系统使用 一下命令打开url在浏览器
	    case "win32":
	        exec(`start ${baseUrl}`);
	        break;
	    // 默认mac系统
	    default:
	        exec(`start ${baseUrl}`);
	        break;
	}
}); 