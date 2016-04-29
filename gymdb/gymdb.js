function createColl(e){var n=require("./collections/"+e)[e];return Db.insert(e,n).then(function(){return Db.ensureIndex(e,INDEX[e])})}function createCollections(){var e=[];return COLL_NAMES.forEach(function(n){e.push(createColl(n))}),$.when.apply($,e)}var Db=require("../db"),$=require("jquery-deferred"),COLL_NAMES=["exercises","gyms","muscles","players","achievements","shop","coaches"],REF_NAMES=["exercises","gyms","muscles","achievements","shop"],INDEX={players:{score:-1},coaches:{q:-1}};module.exports={init:function(e){return Db.init(e,COLL_NAMES,REF_NAMES)},close:function(){return $.Deferred(function(e){Db.getDb().close(function(){e.resolve()})})},create:function(e){return Db.connect(e).then(function(){return Db.getCollections(COLL_NAMES)}).then(function(){return Db.clearCollections(COLL_NAMES)}).then(function(){return createCollections()})},COLL_NAMES:COLL_NAMES,REF_NAMES:REF_NAMES};