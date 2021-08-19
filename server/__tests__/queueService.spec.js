const queueService = require("../src/components/queue/queueService");

/**
 *  Prepare this.storage inside testing classes
 */
const queueStorage = (queueService.storage = jest.fn());
queueStorage.getFirstFromList = jest.fn();
queueStorage.popFromList = jest.fn();
queueStorage.addToList = jest.fn();

/**
 *  Testing QueueService and ResolutionsService
 */
beforeEach(() => jest.clearAllMocks());

describe("'QueueService' class", () => {
  it("'getCurrentPerson' method", async () => {
    queueStorage.getFirstFromList.mockResolvedValue("mia");
    const result = await queueService.getCurrentPerson();

    expect(result).toEqual({ key: "mia" });
    expect(queueStorage.getFirstFromList).toHaveBeenCalledTimes(1);
    expect(queueStorage.getFirstFromList).toHaveBeenCalledWith();
    expect(await queueStorage.getFirstFromList()).toBe("mia");

    queueStorage.getFirstFromList.mockResolvedValue(null);
    const result2 = await queueService.getCurrentPerson();
    expect(result2).toEqual(null);
  });

  it("'getNextPerson' method", async () => {
    queueStorage.getFirstFromList.mockResolvedValue("vincent");
    const result = await queueService.getNextPerson();

    expect(result).toEqual({ key: "vincent" });
    expect(queueStorage.getFirstFromList).toHaveBeenCalledTimes(1);
    expect(queueStorage.getFirstFromList).toHaveBeenCalledWith();
    expect(queueStorage.popFromList).toHaveBeenCalledTimes(1);
    expect(queueStorage.popFromList).toHaveBeenCalledWith();
    expect(await queueStorage.getFirstFromList()).toBe("vincent");

    queueStorage.getFirstFromList.mockResolvedValue(null);
    const result2 = await queueService.getNextPerson();
    expect(result2).toEqual(null);
  });

  it("'addToQueue' method", async () => {
    queueStorage.addToList.mockResolvedValue();
    const result = await queueService.addToQueue({ key: "vincent" });

    expect(result).toBeUndefined();
    expect(queueStorage.addToList).toHaveBeenCalledTimes(1);
    expect(queueStorage.addToList).toHaveBeenCalledWith("vincent");
    expect(await queueStorage.addToList()).toBeUndefined();
  });
});
