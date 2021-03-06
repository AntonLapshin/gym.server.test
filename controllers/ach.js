var Db = require('../db');
var Player = require('./player');
var Coach = require('./coach');
var $ = require('jquery-deferred');

function checkAchGroup(player, ids) {
  var ach = player.private.achievements;
  var res = true;
  ids.forEach(function(id) {
    if (ach.indexOf(id) === -1) {
      res = false;
      return false;
    }
  });
  return res;
}

function getPr(player, id) {
  var exs = player.public.exercises;
  var e = $.grep(exs, function(e) {
    return e._id == id;
  });
  if (e.length === 0)
    return null;
  return e[0].pr;
}

function checkRank(player, id) {
  if (!player.public.ranks)
    return false;

  for (var i = 0; i < player.public.ranks.length; i++) {
    var r = player.public.ranks[i];
    if (parseInt(r[1]) >= id)
      return true;
  }
}

var achList = {

  // -------------------------------------------------------------------------- Ученик
  100: function(player, result) {
    return checkAchGroup(player, [101, 102, 103, 104, 105, 106, 107, 108, 109]);
  },

  // Перейти на страницу к тренеру
  101: function(player, result) {
    return result.player && result.player.public.coach || player.public.level > 0;
  },

  // Нанять тренера
  102: function(player, result) {
    return player.private.coach || player.public.level > 0;
  },

  // Брусья 1 повтор
  103: function(player, result) {
    return result.id === 1 && result.fact >= 1 && result.weight >= 0 || player.public.level > 0;
  },

  // Жим 40 кг
  104: function(player, result) {
    return result.id === 2 && result.fact >= 1 && result.weight >= 40 || player.public.level > 0;
  },

  // Сбор штанги
  105: function(player, result) {
    return result.job === 'success' || player.public.level > 0;
  },

  // Уборка
  106: function(player, result, req) {
    return player.private.garb === 0 || player.public.level > 0;
  },

  // Купить еды
  107: function(player, result) {
    if (player.public.level > 0)
      return true;
    var p = result.purchase;
    if (!p)
      return false;
    return p.type === 'food' && p.success === true;
  },

  // Отдохнуть
  108: function(player, result) {
    if (player.public.level > 0)
      return true;
    var p = result.purchase;
    if (!p)
      return false;
    return p.type === 'rest' && p.success === true;
  },

  // Перейти на новый уровень
  109: function(player, result) {
    return result.levelChange == 1 || player.public.level > 0;
  },

  // -------------------------------------------------------------------- Новичок
  200: function(player, result) {
    return checkAchGroup(player, [201, 202, 203, 204, 205, 206, 207, 208]);
  },

  // Турник
  201: function(player, result) {
    return player.public.level > 1 || result.id === 0 && result.fact >= 1 && result.weight >= 0;
  },

  // Брусья 2 раза
  202: function(player, result) {
    return player.public.level > 1 || result.id === 1 && result.fact >= 2 && result.weight >= 0;
  },

  // Купить энергетик
  203: function(player, result) {
    var p = result.purchase;
    if (!p)
      return false;
    return p.type === 'stimul' && p.success === true && p.id === 2;
  },

  // Купить протеин
  204: function(player, result) {
    var p = result.purchase;
    if (!p)
      return false;
    return p.type === 'stimul' && p.success === true && p.id === 0;
  },

  // Купить причу
  205: function(player, result) {
    if (player.public.hss && player.public.hss.length > 0)
      return true;
    var p = result.purchase;
    if (!p)
      return false;
    return p.type === 'hs' && p.success === true;
  },

  // Купить очки
  206: function(player, result) {
    if (player.public.gls && player.public.gls.length > 0)
      return true;
    var p = result.purchase;
    if (!p)
      return false;
    return p.type === 'gl' && p.success === true;
  },

  // Купить бороду
  207: function(player, result) {
    if (player.public.bds && player.public.bds.length > 0)
      return true;
    var p = result.purchase;
    if (!p)
      return false;
    return p.type === 'bd' && p.success === true;
  },

  // Пригласить 3
  208: function(player, result) {
    return player.private.friends >= 3;
  },

  // -------------------------------------------------------------------- Разрядник
  300: function(player, result) {
    return checkAchGroup(player, [301, 302, 303, 304, 305, 306, 307, 308]);
  },

  // Брусья 5 раз
  301: function(player, result) {
    return player.public.level > 5 || result.id === 1 && result.fact >= 5 && result.weight >= 0;
  },

  // Купить креатин
  302: function(player, result) {
    var p = result.purchase;
    if (!p)
      return false;
    return p.type === 'stimul' && p.success === true && p.id === 1;
  },

  // Купить суперэнергетик
  303: function(player, result) {
    var p = result.purchase;
    if (!p)
      return false;
    return p.type === 'stimul' && p.success === true && p.id === 3;
  },

  // Купить шорты
  304: function(player, result) {
    if (player.public.shs && player.public.shs.length > 0)
      return true;
    var p = result.purchase;
    if (!p)
      return false;
    return p.type === 'sh' && p.success === true;
  },

  // Купить майку
  305: function(player, result) {
    if (player.public.tss && player.public.tss.length > 0)
      return true;
    var p = result.purchase;
    if (!p)
      return false;
    return p.type === 'ts' && p.success === true;
  },

  // Купить кросы
  306: function(player, result) {
    if (player.public.sns && player.public.sns.length > 0)
      return true;
    var p = result.purchase;
    if (!p)
      return false;
    return p.type === 'sn' && p.success === true;
  },

  // 3 разряд
  307: function(player, result) {
    if (checkRank(player, 0))
      return true;
    return result.rank >= 0;
  },

  // Пригласить 5
  308: function(player, result) {
    return player.private.friends >= 5;
  },

  // -------------------------------------------------------------------- Тренер
  400: function(player, result) {
    return checkAchGroup(player, [401, 402, 403, 404, 405, 406]);
  },

  // Жим 80 кг 10 раз
  401: function(player, result) {
    return result.id === 2 && result.fact >= 10 && result.weight >= 80;
  },

  // Присед 115 кг 10 раз
  402: function(player, result) {
    return result.id === 3 && result.fact >= 10 && result.weight >= 115;
  },

  // Становая 125 кг 10 раз
  403: function(player, result) {
    return result.id === 4 && result.fact >= 10 && result.weight >= 125;
  },

  // Стать тренером
  404: function(player, result) {
    var isCompleted = player.public.level >= 15;
    if (isCompleted) {
      if (!player.public.coach) {
        result.coach = true;
        player.public.coach = Coach.create(player._id);
      }
    }
    return isCompleted;
  },

  // Пригласить 8
  405: function(player, result) {
    return player.private.friends >= 8;
  },

  // 1 разряд
  406: function(player, result) {
    if (checkRank(player, 2))
      return true;
    return result.rank >= 2;
  },

  // -------------------------------------------------------------------- КМС
  500: function(player, result) {
    return checkAchGroup(player, [501, 502, 503, 504, 505, 506]);
  },

  // Жим 105 кг 10 раз
  501: function(player, result) {
    return result.id === 2 && result.fact >= 10 && result.weight >= 105;
  },

  // Присед 180 кг 10 раз
  502: function(player, result) {
    return result.id === 3 && result.fact >= 10 && result.weight >= 180;
  },

  // Становая 200 кг 10 раз
  503: function(player, result) {
    return result.id === 4 && result.fact >= 10 && result.weight >= 200;
  },

  // 20 учеников
  504: function(player, result) {
    return player.public.coach && player.public.coach.q >= 20;
  },

  // Пригласить 12
  505: function(player, result) {
    return player.private.friends >= 12;
  },

  // КМС
  506: function(player, result) {
    if (checkRank(player, 3))
      return true;
    return result.rank >= 3;
  },

  // -------------------------------------------------------------------- Мастер
  600: function(player, result) {
    return checkAchGroup(player, [601, 602, 603, 604, 605, 606]);
  },

  // Подтягивание 80 кг 10 раз
  601: function(player, result) {
    return result.id === 0 && result.fact >= 10 && result.weight >= 80;
  },

  // Шраги 170 кг 10 раз
  602: function(player, result) {
    return result.id === 7 && result.fact >= 10 && result.weight >= 170;
  },

  // Тяга 125 кг 10 раз
  603: function(player, result) {
    return result.id === 5 && result.fact >= 10 && result.weight >= 115;
  },

  // 40 учеников
  604: function(player, result) {
    return player.public.coach && player.public.coach.q >= 40;
  },

  // Пригласить 15
  605: function(player, result) {
    return player.private.friends >= 15;
  },

  // МС
  606: function(player, result) {
    if (checkRank(player, 4))
      return true;
    return result.rank >= 4;
  },

  // -------------------------------------------------------------------- МСМК
  700: function(player, result) {
    return checkAchGroup(player, [701, 702, 703, 704, 705, 706]);
  },

  // Жим ногами 500 кг 10 раз
  701: function(player, result) {
    return result.id === 10 && result.fact >= 10 && result.weight >= 500;
  },

  // Бицепс 90 кг 20 раз
  702: function(player, result) {
    return result.id === 6 && result.fact >= 20 && result.weight >= 90;
  },

  // Брусья 75 кг 15 раз
  703: function(player, result) {
    return result.id === 1 && result.fact >= 15 && result.weight >= 75;
  },

  // 70 учеников
  704: function(player, result) {
    return player.public.coach && player.public.coach.q >= 70;
  },

  // Пригласить 20
  705: function(player, result) {
    return player.private.friends >= 20;
  },

  // МСМК
  706: function(player, result) {
    if (checkRank(player, 5))
      return true;
    return result.rank >= 5;
  },

  // -------------------------------------------------------------------- Трудяга
  800: function(player, result) {
    return checkAchGroup(player, [801, 802, 803, 804, 805, 806, 807, 808, 809, 810, 811, 812, 813]);
  },

  // Шея 100%
  801: function(player, result) {
    return player.private.stress[0] == 1;
  },

  // Трапы 100%
  802: function(player, result) {
    return player.private.stress[1] == 1;
  },

  // Дельты 100%
  803: function(player, result) {
    return player.private.stress[2] == 1;
  },

  // Бицепс 100%
  804: function(player, result) {
    return player.private.stress[3] == 1;
  },

  // Трицепс 100%
  805: function(player, result) {
    return player.private.stress[4] == 1;
  },

  // Предплечье 100%
  806: function(player, result) {
    return player.private.stress[5] == 1;
  },

  // Грудь 100%
  807: function(player, result) {
    return player.private.stress[6] == 1;
  },

  // Косые 100%
  808: function(player, result) {
    return player.private.stress[7] == 1;
  },

  // Прямые 100%
  809: function(player, result) {
    return player.private.stress[8] == 1;
  },

  // Круглые 100%
  810: function(player, result) {
    return player.private.stress[9] == 1;
  },

  // Широчайшие 100%
  811: function(player, result) {
    return player.private.stress[10] == 1;
  },

  // Квадрицепс 100%
  812: function(player, result) {
    return player.private.stress[13] == 1;
  },

  // Все мышцы 100%
  813: function(player) {
    var isCompleted = true;
    player.private.stress.forEach(function(s) {
      if (s != 1) {
        isCompleted = false;
        return false;
      }
    });
    return isCompleted;
  },

  // -------------------------------------------------------------------- Бодибилдер
  900: function(player, result) {
    return checkAchGroup(player, [901, 902, 903, 904, 905, 906, 907, 908, 909, 910]);
  },

  // Весовая 59
  901: function(player, result) {
    return player.public.mass && player.public.mass >= 53;
  },

  // Весовая 66
  902: function(player, result) {
    return player.public.mass && player.public.mass >= 59;
  },

  // Весовая 74
  903: function(player, result) {
    return player.public.mass && player.public.mass >= 66;
  },

  // Весовая 83
  904: function(player, result) {
    return player.public.mass && player.public.mass >= 74;
  },

  // Весовая 93
  905: function(player, result) {
    return player.public.mass && player.public.mass >= 83;
  },

  // Весовая 105
  906: function(player, result) {
    return player.public.mass && player.public.mass >= 93;
  },

  // Весовая 120
  907: function(player, result) {
    return player.public.mass && player.public.mass >= 105;
  },

  // Весовая 130
  908: function(player, result) {
    return player.public.mass && player.public.mass >= 120;
  },

  // Весовая 140
  909: function(player, result) {
    return player.public.mass && player.public.mass >= 130;
  },

  // Весовая 150
  910: function(player, result) {
    return player.public.mass && player.public.mass >= 140;
  },

  // -------------------------------------------------------------------- Силовой экстрим
  1000: function(player, result) {
    return checkAchGroup(player, [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010,
      1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020
    ]);
  },

  // Становая тяга 180 кг на 1 раз
  1001: function(player, result) {
    var pr = getPr(player, 4);
    if (pr && pr >= 180)
      return true;
    return result.id === 4 && result.fact >= 1 && result.weight >= 180;
  },

  // Подъем на бицепс 60 кг на 1 раз
  1002: function(player, result) {
    var pr = getPr(player, 6);
    if (pr && pr >= 60)
      return true;
    return result.id === 6 && result.fact >= 1 && result.weight >= 60;
  },

  // Шраги 120 кг на 1 раз
  1003: function(player, result) {
    var pr = getPr(player, 7);
    if (pr && pr >= 120)
      return true;
    return result.id === 7 && result.fact >= 1 && result.weight >= 120;
  },

  // Сделать тягу к поясу 110 кг на 1 раз
  1004: function(player, result) {
    var pr = getPr(player, 5);
    if (pr && pr >= 110)
      return true;
    return result.id === 5 && result.fact >= 1 && result.weight >= 110;
  },

  // Подтянуться с весом 100 раз 
  1005: function(player, result) {
    var pr = getPr(player, 0);
    if (pr && pr >= 100)
      return true;
    return result.id === 0 && result.fact >= 1 && result.weight >= 100;
  },

  // Отжаться на брусьях с весом 100 раз
  1006: function(player, result) {
    var pr = getPr(player, 1);
    if (pr && pr >= 100)
      return true;
    return result.id === 1 && result.fact >= 1 && result.weight >= 100;
  },

  // Жим лежа 170 кг на 1 раз
  1007: function(player, result) {
    var pr = getPr(player, 2);
    if (pr && pr >= 170)
      return true;
    return result.id === 2 && result.fact >= 1 && result.weight >= 170;
  },

  // Приседания со штангой 250 кг на 1 раз
  1008: function(player, result) {
    var pr = getPr(player, 3);
    if (pr && pr >= 250)
      return true;
    return result.id === 3 && result.fact >= 1 && result.weight >= 250;
  },

  // Становая тяга 280 кг на 1 раз
  1009: function(player, result) {
    var pr = getPr(player, 4);
    if (pr && pr >= 280)
      return true;
    return result.id === 4 && result.fact >= 1 && result.weight >= 280;
  },

  // Подъем на бицепс 120 кг на 1 раз
  1010: function(player, result) {
    var pr = getPr(player, 6);
    if (pr && pr >= 120)
      return true;
    return result.id === 6 && result.fact >= 1 && result.weight >= 120;
  },

  // Шраги 200 кг на 1 раз
  1011: function(player, result) {
    var pr = getPr(player, 7);
    if (pr && pr >= 200)
      return true;
    return result.id === 7 && result.fact >= 1 && result.weight >= 200;
  },

  // Сделать тягу к поясу 150 кг на 1 раз
  1012: function(player, result) {
    var pr = getPr(player, 5);
    if (pr && pr >= 150)
      return true;
    return result.id === 5 && result.fact >= 1 && result.weight >= 150;
  },

  // Подтянуться с весом 160 раз 
  1013: function(player, result) {
    var pr = getPr(player, 0);
    if (pr && pr >= 160)
      return true;
    return result.id === 0 && result.fact >= 1 && result.weight >= 160;
  },

  // Отжаться на брусьях с весом 160 раз
  1014: function(player, result) {
    var pr = getPr(player, 1);
    if (pr && pr >= 160)
      return true;
    return result.id === 1 && result.fact >= 1 && result.weight >= 160;
  },

  // Жим лежа 230 кг на 1 раз
  1015: function(player, result) {
    var pr = getPr(player, 2);
    if (pr && pr >= 230)
      return true;
    return result.id === 2 && result.fact >= 1 && result.weight >= 230;
  },

  // Приседания со штангой 360 кг на 1 раз
  1016: function(player, result) {
    var pr = getPr(player, 3);
    if (pr && pr >= 360)
      return true;
    return result.id === 3 && result.fact >= 1 && result.weight >= 260;
  },

  // Становая тяга 390 кг на 1 раз
  1017: function(player, result) {
    var pr = getPr(player, 4);
    if (pr && pr >= 390)
      return true;
    return result.id === 4 && result.fact >= 1 && result.weight >= 390;
  },

  // Подъем на бицепс 180 кг на 1 раз
  1018: function(player, result) {
    var pr = getPr(player, 6);
    if (pr && pr >= 180)
      return true;
    return result.id === 6 && result.fact >= 1 && result.weight >= 180;
  },

  // Шраги 330 кг на 1 раз
  1019: function(player, result) {
    var pr = getPr(player, 7);
    if (pr && pr >= 330)
      return true;
    return result.id === 7 && result.fact >= 1 && result.weight >= 330;
  },

  // Сделать тягу к поясу 220 кг на 1 раз
  1020: function(player, result) {
    var pr = getPr(player, 5);
    if (pr && pr >= 220)
      return true;
    return result.id === 5 && result.fact >= 1 && result.weight >= 220;
  }

};

function addExercise(player, id, result) {
  if ($.grep(player.public.exercises, function(ex) {
    return ex._id === id;
  }).length === 0) {
    player.public.exercises.push({
      _id: id
    });
    result.purchase = {
      success: true,
      type: 'exercises',
      id: id
    }
  }
}

function addGym(player, id, result) {
  if (player.private.gyms.indexOf(id) === -1) {
    player.private.gyms.push(id);
    result.purchase = {
      success: true,
      type: 'gyms',
      id: id
    }
  }
}

module.exports = {
  handler: function(session, result, req) {
    var player = session.player;
    if (typeof result !== 'object' || result === player)
      return;

    var newAchievements = [];
    var achievements = player.private.achievements;
    for (var i in achList) {
      var ach = achList[i];
      i = parseInt(i);
      if (achievements.indexOf(i) !== -1)
        continue;

      if (ach(player, result, req)) {

        var a = $.grep(Db.getRefs().achievements, function(a) {
          return a._id == i;
        })[0];

        var noPrize = a.oldId ? (achievements.indexOf(a.oldId) !== -1 ? true : false) : false;

        newAchievements.push(i);
        achievements.push(i);

        if (!noPrize) {
          if (a.prize.money) {
            player.private.money += a.prize.money;
            if (!result.money)
              result.money = 0;
            result.money += a.prize.money;
          }

          if (a.prize.gold) {
            player.private.gold += a.prize.gold;
            if (!result.gold)
              result.gold = 0;
            result.gold += a.prize.gold;
          }

          if (a.prize.type === 'exercises') {
            addExercise(player, a.prize.id, result)
          }

          if (a.prize.type === 'gyms') {
            addGym(player, a.prize.id, result)
          }
        }
      }
    };
    if (newAchievements.length > 0) {
      result.newAchievements = newAchievements;
      session.isDirty = true;
    }
  }
};

function round(v) {
  return Math.round(v * 100) / 100;
}