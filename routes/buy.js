var Db=require("../db"),$=require("jquery-deferred");module.exports={"default":{params:{type:{required:!0},id:{required:!0,parseMethod:parseInt}},handler:function(e,r){var s,p=r.type,a=r.id;if("gyms"===p||"exercises"===p)s=Db.getRefs()[p][a];else{var i=$.grep(Db.getRefs().shop,function(e){return e.name===p})[0];s=i.items[a]}var u={success:!1,purchase:{type:p,id:a,success:!1}},t=$.Deferred(),l=s.money||0,d=s.gold||0;return e.player["private"].gold<d||e.player["private"].money<l?(t.resolve(u),t):(d>0&&(e.player["private"].gold-=d,u.gold=-d),l>0&&(e.player["private"].money-=l,u.money=-l),u.success=u.purchase.success=!0,"exercises"===p?e.player["public"].exercises.push({_id:a}):"hs"===p?e.player["public"].hs=a:e.player["private"][p].push(a),e.isDirty=!0,t.resolve(u),t)}}};