function add(e,r,s){e.player["public"][r]=s,e.player["public"][r+"s"]||(e.player["public"][r+"s"]=[]),-1==e.player["public"][r+"s"].indexOf(s)&&e.player["public"][r+"s"].push(s)}var Db=require("../db"),$=require("jquery-deferred"),_rates={money:20,gold:1},_bonus=.05;module.exports={"default":{params:{type:{required:!0},id:{required:!0,parseMethod:parseInt},real:{required:!0,parseMethod:parseInt}},handler:function(e,r){var s=r.type,a=r.id,i=r.real;if(!(GLOBAL.GYM.test||e.pendingPayment&&e.pendingPayment.amount==i))return $.Deferred(function(e){e.resolve({success:!1})});var p={success:!0,purchase:{type:s,id:a,success:!0}};if("gyms"===s||"food"===s||"rest"===s||"stimul"===s)e.player["private"][s].push(a);else if("exercises"===s)e.player["public"][s].push({_id:a});else if("hs"===s||"bd"===s||"gl"===s)add(e,s,a);else if("money"===s||"gold"===s){var l=Math.floor(i*_rates[s]+i*_bonus*(i*_rates[s]));e.player["private"][s]+=l,p[s]=l,delete p.purchase}var u=$.Deferred();return e.pendingPayment=null,e.isDirty=!0,u.resolve(p),u}}};