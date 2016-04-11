var Db=require("../../db"),Player=require("../../controllers/player"),GymDb=require("../../gymdb/gymdb"),PlayersCollection=require("../../gymdb/collections/players"),DateHelper=require("../../controllers/date"),PLAYER_ID_TEST=0,PLAYER_ID_NOT_EXISTS=-1,PLAYER_NOT_CREATED=99;module.exports={setUp:function(e){GymDb.init().then(GymDb.create,console.log).then(e,console.log)},tearDown:function(e){GymDb.close().then(e,console.log)},exists:function(e){Player.exists(PLAYER_ID_TEST).then(function(n){e.equal(null!=n,!0),e.done()})},notExists:function(e){Player.exists(PLAYER_ID_NOT_EXISTS).then(function(n){e.equal(!n,!0),e.done()})},find:function(e){var n="public";Player.find(PLAYER_ID_TEST,n).then(function(n){e.equal(null!=n,!0),e.done()})},top:function(e){Player.top().then(function(n){e.equal(null!=n,!0),e.done()})},create:function(e){Player.find(PLAYER_NOT_CREATED,"public").then(function(n){return e.equal(void 0==n,!0),Player.create(PLAYER_NOT_CREATED)}).then(function(){return Player.find(PLAYER_NOT_CREATED,"public")}).then(function(n){e.equal(void 0!=n,!0),e.done()})}};