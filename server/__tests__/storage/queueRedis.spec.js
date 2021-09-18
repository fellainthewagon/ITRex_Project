const QueueRedis = require("../../src/components/queue/queueRepositories/queueRedis");

const queueRedis = new QueueRedis();

/**
 * mocking funcs
 */
const client = (queueRedis.client = jest.fn());
client.lindexAsync = jest.fn();
client.lpopAsync = jest.fn();
client.rpushAsync = jest.fn();

/**
 *  vars
 */
const data = { id: 99, name: "mia", specialization: "dentist" };
const delData = { id: 98, name: "vin" };
const { id, name, specialization } = data;
const json = JSON.stringify({ id, name });
const delJson = JSON.stringify(delData);

beforeEach(() => jest.clearAllMocks());

async function catchBlockTest(method, fn) {
  jest.spyOn(client, method).mockImplementation(async () => {
    throw new Error("Some error");
  });
  await expect(fn()).rejects.toThrowError();
  client[method].mockRestore();
}

/**
 * TEST
 */
describe("'QueueRedis' class", () => {
  it("'getFirstFromList' method", async () => {
    client.lindexAsync.mockResolvedValue(json);

    expect(await queueRedis.getFirstFromList(specialization)).toEqual({
      id,
      name,
    });
    expect(client.lindexAsync).toHaveBeenCalledTimes(1);
    expect(client.lindexAsync).toHaveBeenCalledWith(
      `${queueRedis.listName}${data.specialization}`,
      0
    );

    client.lindexAsync.mockResolvedValue(null);
    expect(await queueRedis.getFirstFromList()).toBeNull();

    await catchBlockTest("lindexAsync", queueRedis.getFirstFromList);
  });

  it("'getNextFromList' method", async () => {
    client.lpopAsync.mockResolvedValue(delJson);
    queueRedis.getFirstFromList = jest.fn();
    queueRedis.getFirstFromList.mockResolvedValue({ id, name });

    expect(await queueRedis.getNextFromList(specialization)).toEqual({
      id,
      name,
    });
    expect(client.lpopAsync).toHaveBeenCalledTimes(1);
    expect(client.lpopAsync).toHaveBeenCalledWith(
      `${queueRedis.listName}${specialization}`
    );
    expect(queueRedis.getFirstFromList).toHaveBeenCalledTimes(1);
    expect(queueRedis.getFirstFromList).toHaveBeenCalledWith(specialization);

    client.lpopAsync.mockResolvedValue(null);
    expect(await queueRedis.getNextFromList()).toBeNull();

    await catchBlockTest("lpopAsync", queueRedis.getNextFromList);
  });

  it("'addToList' method", async () => {
    client.rpushAsync.mockResolvedValue();

    expect(await queueRedis.addToList(data)).toBeUndefined();
    expect(client.rpushAsync).toHaveBeenCalledTimes(1);
    expect(client.rpushAsync).toHaveBeenCalledWith(
      `${queueRedis.listName}${data.specialization}`,
      json
    );

    await catchBlockTest("rpushAsync", queueRedis.addToList);
  });
});
