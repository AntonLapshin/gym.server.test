var $=require("jquery-deferred");module.exports={"default":{params:{playerId:{required:!0,parseMethod:parseInt},amount:{required:!0,parseMethod:parseInt}},handler:function(e,r){e.pendingPayment={amount:r.amount};var a=$.Deferred();return e.save(function(){a.resolve(!0)}),a}}};