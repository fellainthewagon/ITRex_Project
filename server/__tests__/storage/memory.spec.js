const Memory = require("../../src/components/storage/memory");

const memory = new Memory();

/**
 * mocking funcs
 */
memory.search = jest.fn();
memory.remove = jest.fn();
Date.now = jest.fn();

/**
 *  vars
 */
const data = {
  patient_id: "55",
  resolution: "hello",
  timestamp: 1000,
};

beforeEach(() => {
  jest.clearAllMocks();
  memory.queue = [
    { id: 99, name: "mia" },
    { id: 100, name: "vin" },
  ];
  memory.resolutions = [data];
});

afterEach(() => {
  memory.queue = [];
  memory.resolutions = [];
});

/**
 * TEST
 */
describe("'Memory' storage class", () => {
  it("'getFirstFromList' method", async () => {
    expect(await memory.getFirstFromList()).toEqual({ id: 99, name: "mia" });
    memory.queue = [];
    expect(await memory.getFirstFromList()).toBeUndefined();
  });

  it("'getNextFromList' method", async () => {
    expect(memory.queue.length).toBe(2);
    expect(await memory.getNextFromList()).toEqual({ id: 100, name: "vin" });
    expect(memory.queue.length).toBe(1);
  });

  it("'addToList' method", async () => {
    expect(memory.queue.length).toBe(2);
    await memory.addToList({ id: 100, name: "sia" });
    expect(memory.queue.length).toBe(3);
  });

  it("'create' method", async () => {
    expect(memory.resolutions.length).toBe(1);
    await memory.create("56", "Yeahh!", 100);
    expect(memory.resolutions.length).toBe(2);
    expect(Date.now).toHaveBeenCalledTimes(1);
  });

  it("'findById' method, if the 'TTL' has not expired", async () => {
    memory.search.mockResolvedValue(data);
    Date.now.mockReturnValue(999);

    expect(await memory.findById(55)).toEqual(data);
    expect(memory.search).toHaveBeenCalledWith("55");
    expect(memory.search).toHaveBeenCalledTimes(1);
    expect(memory.remove).toHaveBeenCalledTimes(0);
    expect(Date.now).toHaveBeenCalledTimes(1);
  });

  it("'findById' method, if the 'TTL' expired", async () => {
    memory.search.mockResolvedValue(data);
    Date.now.mockReturnValue(1001);

    expect(await memory.findById(55)).toBeNull();
    expect(memory.remove).toHaveBeenCalledWith("55");
    expect(memory.remove).toHaveBeenCalledTimes(1);
    expect(Date.now).toHaveBeenCalledTimes(1);
  });

  it("'deleteById' method, if the 'patient' is in the storage", async () => {
    memory.search.mockResolvedValue(data);
    memory.remove.mockResolvedValue(true);

    expect(await memory.deleteById("55")).toBe(true);
    expect(memory.remove).toHaveBeenCalledTimes(1);
  });

  it("'deleteById' method, if the 'patient' isn't in the storage", async () => {
    memory.search.mockResolvedValue(undefined);

    expect(await memory.deleteById("55")).toBeNull();
    expect(memory.search).toHaveBeenCalledWith("55");
    expect(memory.search).toHaveBeenCalledTimes(1);
    expect(memory.remove).toHaveBeenCalledTimes(0);

    memory.search.mockResolvedValue(null);
    expect(await memory.deleteById("55")).toBeNull();
  });

  it("'search' and 'remove' secondary halper methods", async () => {
    const newMemory = new Memory();
    newMemory.resolutions = [data];

    expect(await newMemory.search("55")).toEqual(data);
    expect(await newMemory.search("54")).toBe(undefined);
    expect(await newMemory.remove("55")).toBe(true);
    expect(await newMemory.search("55")).toBeNull();
  });
});
