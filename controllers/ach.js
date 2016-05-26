function checkAchGroup(t,n){var r=t["private"].achievements,e=!0;return n.forEach(function(t){return-1===r.indexOf(t)?(e=!1,!1):void 0}),e}function addExercise(t,n,r){0===$.grep(t["public"].exercises,function(t){return t._id===n}).length&&(t["public"].exercises.push({_id:n}),r.purchase={success:!0,type:"exercises",id:n})}function addGym(t,n,r){-1===t["private"].gyms.indexOf(n)&&(t["private"].gyms.push(n),r.purchase={success:!0,type:"gyms",id:n})}function round(t){return Math.round(100*t)/100}var Db=require("../db"),Player=require("./player"),Coach=require("./coach"),$=require("jquery-deferred"),Achs=require("../gymdb/collections/achievements"),achList={100:function(t,n){return checkAchGroup(t,[101,102,103,104,105,106,107,108,109])},101:function(t,n){return t["private"].coach},102:function(t,n){return n.player&&n.player["public"].coach},103:function(t,n){return 1===n.id&&n.fact>=1&&n.weight>=0},104:function(t,n){return 2===n.id&&n.fact>=1&&n.weight>=40},105:function(t,n){return"success"===n.job},106:function(t,n,r){return 0===t["private"].garb},107:function(t,n){var r=n.purchase;return r?"food"===r.type&&r.success===!0:!1},108:function(t,n){var r=n.purchase;return r?"rest"===r.type&&r.success===!0:!1},109:function(t,n){return 1==n.levelChange},200:function(t,n){return checkAchGroup(t,[201,202,203,204,205,206,207,208])},201:function(t,n){return 0===n.id&&n.fact>=1&&n.weight>=0},202:function(t,n){return 1===n.id&&n.fact>=2&&n.weight>=0},203:function(t,n){var r=n.purchase;return r?"stimul"===r.type&&r.success===!0&&2===r.id:!1},204:function(t,n){var r=n.purchase;return r?"stimul"===r.type&&r.success===!0&&0===r.id:!1},205:function(t,n){var r=n.purchase;return r?"hs"===r.type&&r.success===!0:!1},206:function(t,n){var r=n.purchase;return r?"gl"===r.type&&r.success===!0:!1},207:function(t,n){var r=n.purchase;return r?"bd"===r.type&&r.success===!0:!1},208:function(t,n){return t["private"].friends>=3},300:function(t,n){return checkAchGroup(t,[301,302,303,304,305,306,307,308])},301:function(t,n){return 1===n.id&&n.fact>=5&&n.weight>=0},302:function(t,n){var r=n.purchase;return r?"stimul"===r.type&&r.success===!0&&1===r.id:!1},303:function(t,n){var r=n.purchase;return r?"stimul"===r.type&&r.success===!0&&3===r.id:!1},304:function(t,n){var r=n.purchase;return r?"sh"===r.type&&r.success===!0:!1},305:function(t,n){var r=n.purchase;return r?"ts"===r.type&&r.success===!0:!1},306:function(t,n){var r=n.purchase;return r?"sn"===r.type&&r.success===!0:!1},307:function(t,n){return n.rank>=0},308:function(t,n){return t["private"].friends>=5},400:function(t,n){return checkAchGroup(t,[401,402,403,404,405,406])},401:function(t,n){return 2===n.id&&n.fact>=10&&n.weight>=80},402:function(t,n){return 3===n.id&&n.fact>=10&&n.weight>=115},403:function(t,n){return 4===n.id&&n.fact>=10&&n.weight>=125},404:function(t,n){var r=t["public"].level>=15;return r&&(t["public"].coach||(n.coach=!0,t["public"].coach=Coach.create(t._id))),r},405:function(t,n){return t["private"].friends>=8},406:function(t,n){return n.rank>=2},500:function(t,n){return checkAchGroup(t,[501,502,503,504,505,506])},501:function(t,n){return 2===n.id&&n.fact>=10&&n.weight>=105},502:function(t,n){return 3===n.id&&n.fact>=10&&n.weight>=180},503:function(t,n){return 4===n.id&&n.fact>=10&&n.weight>=200},504:function(t,n){return t["public"].coach&&t["public"].coach.q>20},505:function(t,n){return t["private"].friends>=12},506:function(t,n){return n.rank>=3},600:function(t,n){return checkAchGroup(t,[601,602,603,604,605,606])},601:function(t,n){return 0===n.id&&n.fact>=10&&n.weight>=80},602:function(t,n){return 7===n.id&&n.fact>=10&&n.weight>=170},603:function(t,n){return 5===n.id&&n.fact>=10&&n.weight>=115},604:function(t,n){return t["public"].coach&&t["public"].coach.q>40},605:function(t,n){return t["private"].friends>=15},606:function(t,n){return n.rank>=4},700:function(t,n){return checkAchGroup(t,[701,702,703,704,705,706])},701:function(t,n){return 10===n.id&&n.fact>=10&&n.weight>=500},702:function(t,n){return 7===n.id&&n.fact>=20&&n.weight>=90},703:function(t,n){return 1===n.id&&n.fact>=15&&n.weight>=75},704:function(t,n){return t["public"].coach&&t["public"].coach.q>70},705:function(t,n){return t["private"].friends>=20},706:function(t,n){return n.rank>=5},800:function(t,n){return checkAchGroup(t,[801,802,803,804,805,806,807,808,809,810,811,812,813])},801:function(t,n){return 1==t["private"].body[0].stress},802:function(t,n){return 1==t["private"].body[1].stress},803:function(t,n){return 1==t["private"].body[2].stress},804:function(t,n){return 1==t["private"].body[3].stress},805:function(t,n){return 1==t["private"].body[4].stress},806:function(t,n){return 1==t["private"].body[5].stress},807:function(t,n){return 1==t["private"].body[6].stress},808:function(t,n){return 1==t["private"].body[7].stress},809:function(t,n){return 1==t["private"].body[8].stress},810:function(t,n){return 1==t["private"].body[9].stress},811:function(t,n){return 1==t["private"].body[10].stress},812:function(t,n){return 1==t["private"].body[13].stress},813:function(t){var n=!0;return t["private"].body.forEach(function(t){return 1!=t.stress?(n=!1,!1):void 0}),n},900:function(t,n){return checkAchGroup(t,[901,902,903,904,905,906,907,908,909,910])},901:function(t,n){return t["public"].mass&&t["public"].mass>=53},902:function(t,n){return t["public"].mass&&t["public"].mass>=59},903:function(t,n){return t["public"].mass&&t["public"].mass>=66},904:function(t,n){return t["public"].mass&&t["public"].mass>=74},905:function(t,n){return t["public"].mass&&t["public"].mass>=83},906:function(t,n){return t["public"].mass&&t["public"].mass>=93},907:function(t,n){return t["public"].mass&&t["public"].mass>=105},908:function(t,n){return t["public"].mass&&t["public"].mass>=120},909:function(t,n){return t["public"].mass&&t["public"].mass>=130},910:function(t,n){return t["public"].mass&&t["public"].mass>=140},1e3:function(t,n){return checkAchGroup(t,[1001,1002,1003,1004,1005,1006,1007,1008,1009,1010,1011,1012,1013,1014,1015,1016,1017,1018,1019,1020])},1001:function(t,n){return 4===n.id&&n.fact>=1&&n.weight>=180},1001:function(t,n){return 6===n.id&&n.fact>=1&&n.weight>=60},1003:function(t,n){return 7===n.id&&n.fact>=1&&n.weight>=120},1004:function(t,n){return 5===n.id&&n.fact>=1&&n.weight>=110},1005:function(t,n){return 0===n.id&&n.fact>=1&&n.weight>=100},1006:function(t,n){return 1===n.id&&n.fact>=1&&n.weight>=100},1007:function(t,n){return 2===n.id&&n.fact>=1&&n.weight>=170},1008:function(t,n){return 3===n.id&&n.fact>=1&&n.weight>=250},1009:function(t,n){return 4===n.id&&n.fact>=1&&n.weight>=280},1010:function(t,n){return 6===n.id&&n.fact>=1&&n.weight>=120},1011:function(t,n){return 7===n.id&&n.fact>=1&&n.weight>=200},1012:function(t,n){return 5===n.id&&n.fact>=1&&n.weight>=150},1013:function(t,n){return 0===n.id&&n.fact>=1&&n.weight>=160},1014:function(t,n){return 1===n.id&&n.fact>=1&&n.weight>=160},1015:function(t,n){return 2===n.id&&n.fact>=1&&n.weight>=230},1016:function(t,n){return 3===n.id&&n.fact>=1&&n.weight>=260},1017:function(t,n){return 4===n.id&&n.fact>=1&&n.weight>=390},1018:function(t,n){return 6===n.id&&n.fact>=1&&n.weight>=180},1019:function(t,n){return 7===n.id&&n.fact>=1&&n.weight>=330},1020:function(t,n){return 5===n.id&&n.fact>=1&&n.weight>=220}};module.exports={handler:function(t,n,r){var e=t.player;if("object"==typeof n&&n!==e){var u=[],i=e["private"].achievements;for(var c in achList){var s=achList[c];if(c=parseInt(c),-1===i.indexOf(c)&&s(e,n,r)){var o=$.grep(Achs.achievements,function(t){return t._id==c})[0],f=o.oldId?-1!==i.indexOf(o.oldId):!1;u.push(c),i.push(c),f||(o.prize.money&&(e["private"].money+=o.prize.money,n.money=o.prize.money),o.prize.gold&&(e["private"].gold+=o.prize.gold,n.gold=o.prize.gold),"exercises"===o.prize.type&&addExercise(e,o.prize.id,n),"gyms"===o.prize.type&&addGym(e,o.prize.id,n))}}u.length>0&&(n.newAchievements=u,t.isDirty=!0)}}};