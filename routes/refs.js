var Db=require("../db"),$=require("jquery-deferred");module.exports={"default":{handler:function(){return $.Deferred(function(e){e.resolve({success:!0,refs:Db.getRefs()})})}}};