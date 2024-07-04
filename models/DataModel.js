const { Model } = require("objection");

class DataModel extends Model {
  static get tableName() {
    return "data";
  }
}

module.exports = DataModel;
