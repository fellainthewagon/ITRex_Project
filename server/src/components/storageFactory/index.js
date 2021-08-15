const { storage } = require("../../../config");
const container = require("./storageContainer");
const msg = require("../../library/statusMessage");

class StorageFactory {
  constructor(storage, container) {
    this.storage = storage;
    this.container = container;
  }

  create = () => {
    if (!this.container.has(this.storage.type)) {
      throw new Error(msg.UNSUPPORTED_TYPE);
    }

    const StorageConstructor = this.container.get(this.storage.type);
    global.console.log(`'${this.storage.type}-storage' in action!`);

    return StorageConstructor();
  };
}

const storageFactory = new StorageFactory(storage, container);

module.exports = storageFactory.create();
