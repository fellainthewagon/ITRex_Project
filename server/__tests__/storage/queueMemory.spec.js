const QueueMemory = require("../../src/components/queue/queueRepositories/queueMemory");

const queueMemory = new QueueMemory();
/**
 *  vars
 */

beforeEach(() => {
  queueMemory.queue = [
    { id: 99, name: "mia" },
    { id: 100, name: "vin" },
  ];
});

afterEach(() => {
  queueMemory.queue = [];
});

/**
 * TEST
 */
describe("'QueueMemory' storage class", () => {
  it("'getFirstFromList' method", async () => {
    expect(await queueMemory.getFirstFromList()).toEqual({
      id: 99,
      name: "mia",
    });
    queueMemory.queue = [];
    expect(await queueMemory.getFirstFromList()).toBeUndefined();
  });

  it("'getNextFromList' method", async () => {
    expect(queueMemory.queue.length).toBe(2);
    expect(await queueMemory.getNextFromList()).toEqual({
      id: 100,
      name: "vin",
    });
    expect(queueMemory.queue.length).toBe(1);
  });

  it("'addToList' method", async () => {
    expect(queueMemory.queue.length).toBe(2);
    await queueMemory.addToList({ id: 100, name: "sia" });
    expect(queueMemory.queue.length).toBe(3);
  });
});
