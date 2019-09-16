const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class JokeMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
    await super.createIndex({ awid: 1, code: 1 }, { unique: true });
  }

  async create(joke) {
    return await super.insertOne(joke);
  }

  async get(awid, code) {
    return await super.findOne({ awid, code });
  }

  async setActive(awid, code) {
    return await super.findOneAndUpdate({ awid, code }, { state: "active" }, "NONE");
  }
}

module.exports = JokeMongo;
