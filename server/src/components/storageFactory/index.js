const container = require("./storageContainer");
const { resolution, queue } = require("../../../config");
const { UNSUPPORTED_TYPE } = require("../../library/statusMessage");

class Factory {
  constructor(container) {
    this.container = container;
  }

  createStorage = ({ type }) => {
    if (!this.container.has(type)) {
      throw new Error(UNSUPPORTED_TYPE);
    }
    const storageProvider = this.container.get(type);

    return storageProvider();
  };
}

const factory = new Factory(container);

exports.resolutionStorageService = factory.createStorage(resolution);
exports.queueStorageService = factory.createStorage(queue);
