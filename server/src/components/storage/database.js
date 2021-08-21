module.exports = class Database {
  constructor() {
    this.db = require("./models/db");
    this.exception = DatabaseException;
    this.id = 1;
  }

  async getFirstFromList() {
    try {
      const patient = await this.db.Queue.findOne({ where: { id: this.id } });
      return patient.dataValues.name;
    } catch (error) {
      throw new this.exception(error);
    }
  }

  async popFromList() {
    try {
      await this.db.Queue.destroy({ where: { id: this.id } });
      this.id++;
    } catch (error) {
      throw new this.exception(error);
    }
  }

  async addToList(data) {
    try {
      await this.db.Queue.create({ name: data });
    } catch (error) {
      throw new this.exception(error);
    }
  }

  async create(name, data, ttl) {
    try {
      const timestamp = Date.now() + ttl * 1000;
      await this.db.Resolutions.create({
        name,
        timestamp,
        resolution: data,
      });
    } catch (error) {
      throw new this.exception(error);
    }
  }

  async findByName(name) {
    try {
      const resolution = await this.db.Resolutions.findOne({ where: { name } });
      if (resolution.dataValues.timestamp <= Date.now()) {
        return resolution.dataValues.resolution;
      }
      await resolution.destroy();
      return null;
    } catch (error) {
      throw new this.exception(error);
    }
  }

  async deleteByName(name) {
    try {
      return this.db.Resolutions.destroy({ where: { name } });
    } catch (error) {
      throw new this.exception(error);
    }
  }
};

/**
 * Queue: id - name
 * Resolution: name - resolution - ttl
 */
