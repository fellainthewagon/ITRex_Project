const QueueService = require("../../src/components/queue/queueService");

const queueService = new QueueService();

/**
 * mocking funcs
 */
const storage = (queueService.storage = jest.fn());
storage.addToList = jest.fn();
storage.getFirstFromList = jest.fn();
storage.getNextFromList = jest.fn();

/**
 *  vars
 */
const test = { id: 1, name: "mia", specialization: "dentist" };

beforeEach(() => jest.clearAllMocks());

async function catchBlockTest(method, fn) {
  jest.spyOn(storage, method).mockImplementation(async () => {
    throw new Error("Some error");
  });
  await expect(fn()).rejects.toThrowError();
  storage[method].mockRestore();
}

/**
 * TEST
 */
describe("'QueueService' class", () => {
  it("'addToQueue' method", async () => {
    storage.addToList.mockResolvedValue();

    expect(await queueService.addToQueue(test)).toBeUndefined();
    expect(storage.addToList).toHaveBeenCalledTimes(1);
    expect(storage.addToList).toHaveBeenCalledWith(test);

    await catchBlockTest("addToList", queueService.addToQueue);
  });

  it("'getCurrentPerson' method, if positive result", async () => {
    storage.getFirstFromList.mockResolvedValue(test);

    expect(await queueService.getCurrentPerson(test.id)).toEqual(test);
    expect(storage.getFirstFromList).toHaveBeenCalledTimes(1);
    expect(storage.getFirstFromList).toHaveBeenCalledWith(test.id);

    await catchBlockTest("getFirstFromList", queueService.getCurrentPerson);
  });

  it("'getCurrentPerson' method, if negative result", async () => {
    storage.getFirstFromList.mockResolvedValue(null);

    expect(await queueService.getCurrentPerson(test.specialization)).toBeNull();
    expect(storage.getFirstFromList).toHaveBeenCalledTimes(1);
    expect(storage.getFirstFromList).toHaveBeenCalledWith(test.specialization);
  });

  it("'getNextPerson' method, if positive result", async () => {
    storage.getNextFromList.mockResolvedValue(test);

    expect(await queueService.getNextPerson(test.id)).toEqual(test);
    expect(storage.getNextFromList).toHaveBeenCalledTimes(1);
    expect(storage.getNextFromList).toHaveBeenCalledWith(test.id);

    await catchBlockTest("getNextFromList", queueService.getNextPerson);
  });

  it("'getNextPerson' method, if negative result", async () => {
    storage.getNextFromList.mockResolvedValue(null);

    expect(await queueService.getNextPerson(test.id)).toBeNull();
    expect(storage.getNextFromList).toHaveBeenCalledTimes(1);
    expect(storage.getNextFromList).toHaveBeenCalledWith(test.id);
  });
});
