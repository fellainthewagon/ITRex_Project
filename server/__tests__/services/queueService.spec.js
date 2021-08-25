const queueService = require("../../src/components/queue/queueService");
const { Patient } = require("../../src/db");

/**
 * mocking funcs
 */
const storage = (queueService.storage = jest.fn());
storage.addToList = jest.fn();
storage.getFirstFromList = jest.fn();
storage.getNextFromList = jest.fn();
Patient.findOne = jest.fn();
Patient.create = jest.fn();

/**
 *  vars
 */
const test = { id: 1, name: "mia" };

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
  it("'addToQueue' method, if name found in DB and Patient.create doesn't called", async () => {
    storage.addToList.mockResolvedValue();
    Patient.findOne.mockResolvedValue(test);

    expect(await queueService.addToQueue("mia")).toEqual(test);
    expect(storage.addToList).toHaveBeenCalledTimes(1);
    expect(storage.addToList).toHaveBeenCalledWith(test);
    expect(Patient.findOne).toHaveBeenCalledTimes(1);
    expect(Patient.findOne).toHaveBeenCalledWith({ where: { name: "mia" } });
    expect(Patient.create).toHaveBeenCalledTimes(0);

    await catchBlockTest("addToList", queueService.addToQueue);
  });

  it("'addToQueue' method, if name doesn't exist in DB and Patient.create called", async () => {
    Patient.findOne.mockResolvedValue(null);
    storage.addToList.mockResolvedValue();
    Patient.create.mockResolvedValue(test);

    expect(await queueService.addToQueue("mia")).toEqual(test);
    expect(Patient.create).toHaveBeenCalledTimes(1);
    expect(Patient.create).toHaveBeenCalledWith({ name: "mia" });
  });

  it("'getCurrentPerson' method, if positive result", async () => {
    storage.getFirstFromList.mockResolvedValue(test);

    expect(await queueService.getCurrentPerson()).toEqual(test);
    expect(storage.getFirstFromList).toHaveBeenCalledTimes(1);
    expect(storage.getFirstFromList).toHaveBeenCalledWith();

    await catchBlockTest("getFirstFromList", queueService.getCurrentPerson);
  });

  it("'getCurrentPerson' method, if negative result", async () => {
    storage.getFirstFromList.mockResolvedValue(null);

    expect(await queueService.getCurrentPerson()).toBeNull();
    expect(storage.getFirstFromList).toHaveBeenCalledTimes(1);
    expect(storage.getFirstFromList).toHaveBeenCalledWith();
  });

  it("'getNextPerson' method, if positive result", async () => {
    storage.getNextFromList.mockResolvedValue(test);

    expect(await queueService.getNextPerson()).toEqual(test);
    expect(storage.getNextFromList).toHaveBeenCalledTimes(1);
    expect(storage.getNextFromList).toHaveBeenCalledWith();

    await catchBlockTest("getNextFromList", queueService.getNextPerson);
  });

  it("'getNextPerson' method, if negative result", async () => {
    storage.getNextFromList.mockResolvedValue(null);

    expect(await queueService.getNextPerson()).toBeNull();
    expect(storage.getNextFromList).toHaveBeenCalledTimes(1);
    expect(storage.getNextFromList).toHaveBeenCalledWith();
  });
});
