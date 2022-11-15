var express = require('express');
var router = express.Router();
var {node_ssh} = require('node-ssh');
var ssh = new node_ssh();
var conn = ssh.connect({
    host: '192.168.0.22',
    username: 'goback',
    port: 22,
    password : 'goback@2020'
});

//명령어 보내기   
// ssh.execCommand('원하는 명령어', { }).then(function(result) {
// console.log('결과: ' + result.stdout);
// console.log('에러: ' + result.stderr);
// ssh.dispose();//커넥션 종료
// });

ssh.getFile('C:\Users\PC\Descktop\test', '/home/goback/사진/1.png').then(function(Contents) {
	console.log("DONE");
  }, function(error) {
	console.log(error);
}).then(function(){
	ssh.dispose(); //커넥션 종료
});