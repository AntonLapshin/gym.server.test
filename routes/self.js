function getStress(e){for(var r=function(){for(var e=Db.getRefs().muscles,r=0,t=0;t<e.length;t++)r+=e[t].power;return r},t=r(),a=0,i=0;i<e["private"].body.length;i++){var s=e["private"].body[i],l=Db.getRefs().muscles,o=l[s._id];a+=o.power*s.stress/t}return a}function update(e){var r=module.exports.getRegen(e),t=new Date,a=DateHelper.intervalHours(Date.parse(t)-Date.parse(new Date(e["private"].reg.lastUpdateTime))),i=$.round(r.frazzle*a),s=Math.round(e["private"].energy+r.energy*a);s>PlayersCollection.ENERGY_MAX&&(s=PlayersCollection.ENERGY_MAX),e["private"].garb++,e["private"].garb>GARB_MAX&&(e["private"].garb=GARB_MAX),e["private"].energy=s,e["private"].reg.lastUpdateTime=t.getTime();for(var l=0;l<e["private"].body.length;l++){var o=e["private"].body[l];o.frazzle=$.round(o.frazzle-i),o.frazzle<0&&(o.frazzle=0)}}function getLevelChange(e){var r=new Date;if(e["public"].level>0||e["private"].achievements.length<6){var t=DateHelper.addHoursClone(new Date(e["private"].reg.lastCheckLevelUpTime),CHECK_LEVELUP_PERIOD);if(t>r)return 0}e["private"].reg.lastCheckLevelUpTime=r.getTime();var a,s=module.exports.getPlayerStat(e),l=Math.random()<s.levelUp;if(l?e["public"].level++:(a=Math.random()<s.levelDown,a&&e["public"].level--),l||a)for(i=0;i<e["private"].body.length;i++)e["private"].body[i].frazzle=0,e["private"].body[i].stress=0;return e["private"].rest=[],e["private"].food=[],e["private"].stimul=[],l?1:a?-1:0}var Db=require("../db"),DateHelper=require("../controllers/date"),PlayersCollection=require("../gymdb/collections/players"),Player=require("../controllers/player"),$=require("jquery-deferred"),curve=require("../controllers/curve"),UPDATE_PERIOD=2,CHECK_LEVELUP_PERIOD=2,REG_FRAZZLE_PER_HOUR=1,REG_ENERGY=1,REG_ENERGY_PER_HOUR=REG_ENERGY*PlayersCollection.ENERGY_MAX,MAX_LEVEL=67,GARB_MAX=14,BONUS_MAX=10;module.exports={getPlayerStat:function(e){function r(e,r,t){var a=r*t,i=3*e;return i/a}for(var t=e["public"].level,a=getStress(e),i=curve.getMass(t),s=0,l=0,o=0,n=0;n<e["private"].food.length;n++){var p=e["private"].food[n],v=Db.getRefs().shop[0].items[p];s+=v.carbs,l+=v.fats,o+=v.proteins}var u=curve.getFoodProfit("carbs",r(s,i,6)),p=curve.getFoodProfit("fats",r(l,i,1)),f=curve.getFoodProfit("proteins",r(o,i,2.5)),d=(u+p+f)/3;d>1&&(d=1);for(var g=0,n=0;n<e["private"].rest.length;n++){var c=e["private"].rest[n],E=Db.getRefs().shop[1].items[c];g+=E.coeff}g>1&&(g=1);for(var h=0,n=0;n<e["private"].stimul.length;n++){var y=e["private"].stimul[n],R=Db.getRefs().shop[2].items[y];h+=R.growth}h>.3&&(h=.3),d=.3+.7*d,g=.4+.6*g,h=1+h;var b=1-curve.getLevelFading(t);t===MAX_LEVEL&&(b=0);var D=a*g*d*h;D>1&&(D=1),D*=b,0===t&&g>0&&a>0&&d>0&&(D=1);var _=1===D||0===t?0:1-D;return _=_>.3?0:.2*_,{period:"each "+CHECK_LEVELUP_PERIOD+" hours",levelUp:D,levelDown:_,stress:a,rest:g,food:d,stimul:h,fading:b,foodDetails:{carbs:u,fats:p,proteins:f}}},getRegen:function(e){for(var r=0,t=0;t<e["private"].rest.length;t++){var a=e["private"].rest[t],i=Db.getRefs().shop[1].items[a];r+=i.coeff}r>1&&(r=1),r=.5*r;for(var s=0,t=0;t<e["private"].stimul.length;t++){var l=e["private"].stimul[t],o=Db.getRefs().shop[2].items[l];s+=o.regen}return s>.5&&(s=.5),{energy:(REG_ENERGY+r+s)*PlayersCollection.ENERGY_MAX,frazzle:REG_FRAZZLE_PER_HOUR+r+s}},get:{params:{bill:{parseMethod:parseFloat},friends:{parseMethod:parseInt},garb:{parseMethod:parseInt},bonus:{parseMethod:parseInt}},handler:function(e,r){var t=$.Deferred(),a=e.player;r.bonus&&(a["private"].money+=Math.min(r.bonus,BONUS_MAX),e.isDirty=!0),r.garb&&(a["private"].garb=Math.max(r.garb,GARB_MAX),e.isDirty=!0),r.bill&&a["private"].coach.hired&&(a["private"].coach.bill=r.bill,e.isDirty=!0),r.friends&&(a["private"].friends=r.friends,e.isDirty=!0);var i=new Date,s=a["private"].reg,l=DateHelper.addMinutesClone(new Date(s.lastUpdateTime),UPDATE_PERIOD);if(l>i)return t.resolve({success:!0,player:a}),t;update(a);var o=getLevelChange(a);return e.isDirty=!0,t.resolve({success:!0,player:a,levelChange:o}),t}},getPlayer:{params:{playerId:{required:!0,parseMethod:parseInt}},handler:function(e,r){var t=$.Deferred();return Player.find(r.playerId,["_id","public"]).then(function(e){t.resolve({success:!0,player:e})}),t}},getPlayers:{params:{playerIds:{required:!0,parseMethod:function(e){var r=[];return e.split(",").forEach(function(e){r.push(parseInt(e))}),r}}},handler:function(e,r){var t=$.Deferred();return Player.getPlayers(r.playerIds).then(function(e){t.resolve({success:!0,players:e})}),t}}};