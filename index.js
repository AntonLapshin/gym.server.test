var port=Number(process.env.PORT||8081);require("./server").start(port,{host:"ds013250.mlab.com",port:13250,database:"gymtest",username:"gymadmin",password:"24547294"},{VK_APP_SECRET:"eI2Jkq2h5hiCKs9TKtCI",VK_APP_ID:"5051431"},.2).then(function(){console.log("Listening port "+port)},function(t){throw t});