class Storage {
  constructor(
    storage = [
      { name: "butch", resolution: "bad headache, broken nose" },
      { name: "zed", resolution: "is dead" },
    ]
  ) {
    this.storage = storage;
  }

  addResolution(value) {
    const index = this.#findPatientIndex(value.name);
    index >= 0
      ? (this.storage[index].resolution = value.resolution)
      : this.storage.push(value);
    console.log(this.storage);
  }

  findResolution(name) {
    const index = this.#findPatientIndex(name);
    return index >= 0
      ? this.storage[index].resolution
      : "There is no patient with that name.";
  }

  deletePatient(name) {
    const index = this.#findPatientIndex(name);
    if (index < 0) return;
    this.storage.splice(index, 1);
  }

  #findPatientIndex(name) {
    return this.storage.findIndex((item) => item.name === name);
  }
}

const storage = new Storage();
export default storage;
