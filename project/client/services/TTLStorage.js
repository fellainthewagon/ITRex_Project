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
        (item) => item.key !== value.key
      );
    }, ttl + 1);
  }

  getData(value) {
    console.log(this.ttlStorage);
    const data = this.ttlStorage.find((item) => item.key === value);
    if (!data) return "Data not found";
    if (data.timestamp > Date.now()) return data.key;
    this.ttlStorage = this.ttlStorage.filter((item) => item.key !== value.key);
    return "Data has expired";
  }
}

export default new TTLStorage();
