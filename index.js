var instances=require("./gymdb/instances");GLOBAL.GYM={test:!0,instance:instances.GYMTEST,UPDATE_PERIOD:1,CHECK_LEVELUP_PERIOD:.17,REG_ENERGY_SLOW:.33,REG_ENERGY:.66,REG_FRAZZLE_SLOW:.33,REG_FRAZZLE:.66,REG_TONUS:.001,REG_GARB:30,VK_APP_SECRET:"eI2Jkq2h5hiCKs9TKtCI",VK_APP_ID:"5051431",JOBS:{comp:6e4},COMP_TIME_COEFF:.001,COMP_MIN_Q:1,force:{}},console.log("Starting...");var port=Number(process.env.PORT||8081);require("./server").start(port).then(function(){console.log("Listening port "+port)},function(E){throw E});