const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class JokeMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
  }

  async create(joke) {
    return await super.insertOne(joke);
  }
}

module.exports = JokeMongo;
