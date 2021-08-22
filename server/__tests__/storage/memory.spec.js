const Memory = require("../../src/components/storage/memory");

describe("'Memory' class", () => {
  const memory = new Memory();
  const TTL = 30;

  beforeEach(() => {
    memory.queue = ["mia", "vincent"];
    memory.resolutions = [
      {
        data: { key: "mia", resolution: "hello baby" },
        timestamp: Date.now() + TTL + 10,
      },
    ];
  });

  afterEach(() => {
    memory.queue = [];
    memory.resolutions = [];
  });

  it("'getFirstFromList' method", () => {
    expect(memory.getFirstFromList()).toBe("mia");
    memory.queue = [];
    expect(memory.getFirstFromList()).toBeUndefined();
  });

  it("'popFromList' method", () => {
    expect(memory.popFromList()).toBeUndefined();
    expect(memory.queue).toEqual(["vincent"]);
    expect(memory.queue.length).toBe(1);
    memory.popFromList();
    expect(memory.queue.length).toBe(0);
  });

  it("'addToList' method", () => {
    expect(memory.queue.length).toBe(2);
    memory.addToList("jules");
    expect(memory.queue.length).toBe(3);
    memory.addToList("butch");
    expect(memory.queue.length).toBe(4);
  });

  it("'create' method", () => {
    expect(memory.resolutions.length).toBe(1);
    memory.create("vin", "hello node.js", TTL);
    expect(memory.resolutions.length).toBe(2);
  });

  it("'TTL' testing: expary functionality", () => {
    expect(memory.resolutions.length).toBe(1);
    jest.useFakeTimers();
    memory.create("vin", "hello node.js", TTL);
    jest.runAllTimers();
    expect(memory.resolutions.length).toBe(1);
    jest.useRealTimers();
  });

  it("'findById' method", () => {
    expect(memory.findById("jules")).toBeNull();
    expect(memory.findById("mia")).toBe("hello baby");
  });

  it("'deleteById' method", () => {
    expect(memory.deleteById("jules")).toBeNull();
    expect(memory.deleteById("mia")).toBeTruthy();
  });

  it("'search' and 'remove' secondary halper methods", () => {
    expect(memory.remove("jules")).toBeTruthy();
    expect(memory.search("jules")).toBeUndefined();
    expect(memory.search("mia")).toBeTruthy();
    memory.resolutions = [];
    expect(memory.search("jules")).toBeNull();
  });
});
