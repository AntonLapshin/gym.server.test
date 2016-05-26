function getValue(e,t){var r=[],a=[];return e=e.split(")"),e.pop(),e.forEach(function(e){e=e.substring(1);var t=e.split(",");r.push(parseFloat(t[0])),a.push(parseFloat(t[1]))}),everpolate.linear([t],r,a)[0]}var Db=require("../db"),everpolate=require("../lib/everpolate.browserified.min"),CURVES={dose:"(0,1)(55,5)",doseEffect:"(0,0)(0.5,0.7)(0.75, 0.9)(0.875, 0.95)",coach:"(0,0)(5,0.03)(13,0.15)(25,0.5)(45,0.85)(55,0.95)(67,1)",level:"(0,0.1)(1,0.3)(3,0.7)(6,1.5)(10,3)(16,4)(25,8)(37,13)(40,20)(50,40)(60,60)(67,150)",mass:"(0,45)(67,155)",repeatsEffect:"(0,0.3)(1,0.3)(3,0.6)(6,0.82)(10,0.97)(12,1)(14,0.97)(20,0.78)(25,0.6)(30,0.5)(35,0.5)",ex0:{weight:"(40,35)(45,42)(50,55)(60,73)(85,120)(100,155)(120,190)(155,220)",repeats:"(0,20)(0.2,14)(0.55,7)(0.8,3)(1,1)(1.2,0.5)(1.5,0.2)(2,0)"},ex1:{weight:"(40,41)(45,46)(52,56)(60,67)(85,110)(100,140)(120,185)(155,265)",repeats:"(0,22)(0.2,22)(0.55,18)(0.8,6)(1,1)(1.2,0.5)(1.5,0.2)(2,0)"},ex2:{weight:"(45,40)(53,60)(59,70)(66,80)(74,86)(83,91)(93,95)(105,105)(120,115)(143,135)",repeats:"(0.2,60)(0.3,45)(0.5,26)(0.7,13)(0.8,8)(0.9,4)(1,1)(1.5,0.4)(2,0)"},ex3:{weight:"(45,60)(53,100)(59,110)(66,120)(74,132)(83,147)(93,157)(105,174)(120,187)(143,240)",repeats:"(0.43,40)(0.5,32)(0.57,25)(0.64,20)(0.71,15)(0.86,7)(1,1)(1.5,0.4)(2,0)"},ex4:{weight:"(45,60)(53,100)(59,110)(66,120)(74,134)(83,149)(93,159)(105,182)(120,200)(143,265)",repeats:"(0.43,40)(0.5,32)(0.57,25)(0.64,20)(0.71,15)(0.86,7)(1,1)(1.5,0.4)(2,0)"},ex5:{weight:"(45,15)(62,23)(82,33)(100,42)(125,54)(155,70)",repeats:"(0.2,60)(0.3,45)(0.5,26)(0.7,13)(0.8,8)(0.9,4)(1,1)(1.5,0.4)(2,0)"},ex6:{weight:"(45,12)(62,18)(82,26)(100,34)(125,46)(155,62)",repeats:"(0.2,60)(0.3,45)(0.5,26)(0.7,13)(0.8,8)(0.9,4)(1,1)(1.5,0.4)(2,0)"},ex7:{weight:"(45,30)(62,45)(82,85)(100,140)(125,190)(155,220)",repeats:"(0.43,60)(0.5,45)(0.57,26)(0.64,13)(0.71,8)(0.86,4)(1,1)(1.5,0.4)(2,0)"},ex8:{weight:"(45,7)(62,16)(82,27)(100,36)(125,48)(155,61)",repeats:"(0.2,60)(0.3,45)(0.5,26)(0.7,13)(0.8,8)(0.9,4)(1,1)(1.5,0.4)(2,0)"},ex9:{weight:"(45,0)(62,8)(82,20)(100,30)(125,43)(155,60)",repeats:"(0.2,60)(0.3,45)(0.5,26)(0.7,13)(0.8,8)(0.9,4)(1,1)(1.5,0.4)(2,0)"},ex10:{weight:"(45,30)(62,70)(82,140)(100,220)(125,330)(155,450)",repeats:"(0.43,40)(0.5,32)(0.57,25)(0.64,20)(0.71,15)(0.86,7)(1,1)(1.5,0.4)(2,0)"},ex11:{weight:"(45,0)(62,8)(82,20)(100,30)(125,43)(155,60)",repeats:"(0.2,60)(0.3,45)(0.5,26)(0.7,13)(0.8,8)(0.9,4)(1,1)(1.5,0.4)(2,0)"},ex12:{weight:"(45,0)(62,8)(82,20)(100,30)(125,43)(155,60)",repeats:"(0.2,60)(0.3,45)(0.5,26)(0.7,13)(0.8,8)(0.9,4)(1,1)(1.5,0.4)(2,0)"}};module.exports={getDoseEffect:function(e){var t=getValue(CURVES.doseEffect,e);return t},getDose:function(e){var t=getValue(CURVES.dose,e);return Math.floor(t)},getCoachRate:function(e){var t=this.getCoachEfficiency(e);return Math.ceil(5*t)},getCoachEfficiency:function(e){return getValue(CURVES.coach,e)},getLevelRequirements:function(e){return getValue(CURVES.level,e)},getMass:function(e){return getValue(CURVES.mass,e)},getRepeatsEffect:function(e){return getValue(CURVES.repeatsEffect,e)},getWeightMax:function(e,t){var r=this.getMass(e),a=getValue(CURVES["ex"+t].weight,r);return a},getRepeatsMax:function(e,t,r,a){a=a||this.getWeightMax(e,t);var s=Db.getRefs().exercises[t];s.selfweight&&(r+=this.getMass(e));var i=r/a,g=getValue(CURVES["ex"+t].repeats,i);return 0>g&&(g=0),g},getFoodProfit:function(e,t){return getValue(CURVES[e],t)}};