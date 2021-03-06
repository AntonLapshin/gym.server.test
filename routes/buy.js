var Db = require('../db');
var $ = require('jquery-deferred');
var Purchase = require('../controllers/purchase');

module.exports = {
  default: {
    params: {
      type: {
        required: true,
      },
      id: {
        required: true,
        parseMethod: parseInt
      }
    },
    handler: function(session, params) {
      var type = params.type;
      var id = params.id;
      var item;

      if (type === 'gyms' || type === 'exercises')
        item = Db.getRefs()[type][id];
      else {
        var cat = $.grep(Db.getRefs().shop, function(cat) {
          return cat.name === type;
        })[0];
        item = cat.items[id];
      }

      var answer = {
        success: false,
        purchase: {
          type: type,
          id: id,
          success: false
        }
      };

      var defer = $.Deferred();

      var money = item.money || 0;
      var gold = item.gold || 0;

      if (session.player.private.gold < gold || session.player.private.money < money) {
        defer.resolve(answer);
        return defer;
      }

      if (gold > 0) {
        session.player.private.gold -= gold;
        answer.gold = -gold;
      }
      if (money > 0) {
        session.player.private.money -= money;
        answer.money = -money;
      }
      answer.success = answer.purchase.success = true;

      Purchase.go(session, type, id, answer);

      session.isDirty = true;
      defer.resolve(answer);

      return defer;
    }
  }
};