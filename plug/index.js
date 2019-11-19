// 1. 与服务器端建立连接
var socket = io('http://localhost:8080');
socket.on('connect', function(){});
socket.on("refreshCode", res => {
	location.reload();
});
//socket.emit('reload', { });
