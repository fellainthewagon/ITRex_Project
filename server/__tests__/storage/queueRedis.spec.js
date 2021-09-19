const QueueRedis = require("../../src/components/queue/queueRepositories/queueRedis");

const queueRedis = new QueueRedis();

/**
 * mocking funcs
 */
const client = (queueRedis.client = jest.fn());
client.lindexAsync = jest.fn();
client.lpopAsync = jest.fn();
client.rpushAsync = jest.fn();
client.setAsync = jest.fn();
client.getAsync = jest.fn();
client.delAsync = jest.fn();

/**
 *  vars
 */
const data = { id: 99, name: "mia", specialization: "dentist" };
const delData = { id: 98, name: "vin" };
const json = JSON.stringify(data);
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
    expect(await queueRedis.getFirstFromList(data.specialization)).toEqual(
      data
    );
    expect(client.lindexAsync).toHaveBeenCalledTimes(1);
    expect(client.lindexAsync).toHaveBeenCalledWith(
      `${queueRedis.listName}:${data.specialization}`,
      0
    );

    client.lindexAsync.mockResolvedValue(null);
    expect(await queueRedis.getFirstFromList()).toBeNull();

    await catchBlockTest("lindexAsync", queueRedis.getFirstFromList);
  });

  it("'getNextFromList' method", async () => {
    client.lpopAsync.mockResolvedValue(delJson);
    client.lindexAsync.mockResolvedValue(json);
    client.delAsync.mockResolvedValue();

    expect(await queueRedis.getNextFromList(data.specialization)).toEqual(data);
    expect(client.lpopAsync).toHaveBeenCalledTimes(1);
    expect(client.lpopAsync).toHaveBeenCalledWith(
      `${queueRedis.listName}:${data.specialization}`
    );
    expect(client.delAsync).toHaveBeenCalledTimes(1);
    expect(client.delAsync).toHaveBeenCalledWith(
      queueRedis.existPrefix + delData.id
    );

    client.lpopAsync.mockResolvedValue(null);
    expect(await queueRedis.getNextFromList()).toBeNull();

    await catchBlockTest("lpopAsync", queueRedis.getNextFromList);
  });

  it("'addToList' method", async () => {
    await queueRedis.addToList(data);
    expect(client.rpushAsync).toHaveBeenCalledTimes(1);
    expect(client.rpushAsync).toHaveBeenCalledWith(
      `${queueRedis.listName}:${data.specialization}`,
      json
    );
    expect(client.setAsync).toHaveBeenCalledTimes(1);
    expect(client.setAsync).toHaveBeenCalledWith(
      queueRedis.existPrefix + data.id,
      data.id
    );

    await catchBlockTest("rpushAsync", queueRedis.addToList);
    await catchBlockTest("setAsync", queueRedis.addToList);
  });
});
