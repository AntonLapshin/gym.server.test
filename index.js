var port=Number(process.env.PORT||8081);require("./server").start(port,{host:"ds013250.mlab.com",port:13250,database:"gymtest",username:"gymadmin",password:"24547294"}).then(function(){console.log("Listening port "+port)},function(r){throw r});