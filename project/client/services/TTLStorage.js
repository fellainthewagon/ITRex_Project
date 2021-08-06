class TTLStorage {
  constructor() {
    this.ttlStorage = [];
  }

  setData(value, ttl = 30000) {
    const data = {
      key: value,
      timestamp: Date.now() + ttl,
    };
    this.ttlStorage.push(data);

    setTimeout(() => {
      this.ttlStorage = this.ttlStorage.filter(
        (item) => item.key.name !== value.name
      );
    }, ttl + 10000);
  }

  getData(value) {
    const data = this.ttlStorage.find((item) => item.key.name === value);
    if (!data) return { message: "Data not found" };
    if (data.timestamp > Date.now()) return data.key;
    return { message: "Data has expired" };
  }

  deleteData(value) {
    this.ttlStorage = this.ttlStorage.filter((item) => item.key.name !== value);
    return { message: "Data has been deleted" };
  }
}

// export default new TTLStorage();
