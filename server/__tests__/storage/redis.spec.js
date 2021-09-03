const Redis = require("../../src/components/storage/redis");

const redis = new Redis();

/**
 * mocking funcs
 */
const client = (redis.client = jest.fn());
client.lindexAsync = jest.fn();
client.lpopAsync = jest.fn();
client.rpushAsync = jest.fn();
client.setexAsync = jest.fn();
client.getAsync = jest.fn();
client.delAsync = jest.fn();
client.setAsync = jest.fn();

/**
 *  vars
 */
const TTL = 30;
const data = { id: 99, name: "mia" };
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
describe("'Redis' storage class", () => {
  it("'getFirstFromList' method", async () => {
    client.lindexAsync.mockResolvedValue(json);
    expect(await redis.getFirstFromList()).toEqual(data);
    expect(client.lindexAsync).toHaveBeenCalledTimes(1);
    expect(client.lindexAsync).toHaveBeenCalledWith(redis.listName, 0);

    client.lindexAsync.mockResolvedValue(null);
    expect(await redis.getFirstFromList()).toBeNull();

    await catchBlockTest("lindexAsync", redis.getFirstFromList);
  });

  it("'getNextFromList' method", async () => {
    client.lpopAsync.mockResolvedValue(delJson);
    client.lindexAsync.mockResolvedValue(json);
    client.delAsync.mockResolvedValue();

    expect(await redis.getNextFromList()).toEqual(data);
    expect(client.lpopAsync).toHaveBeenCalledTimes(1);
    expect(client.lpopAsync).toHaveBeenCalledWith(redis.listName);
    expect(client.delAsync).toHaveBeenCalledTimes(1);
    expect(client.delAsync).toHaveBeenCalledWith(
      redis.existPrefix + delData.id
    );

    client.lindexAsync.mockResolvedValue(null);
    expect(await redis.getNextFromList()).toBeNull();

    await catchBlockTest("lpopAsync", redis.getNextFromList);
  });

  it("'addToList' method, if 'patientId' is not in Redis", async () => {
    client.getAsync.mockResolvedValue(null);

    expect(await redis.addToList(data)).toBeUndefined();
    expect(client.rpushAsync).toHaveBeenCalledTimes(1);
    expect(client.rpushAsync).toHaveBeenCalledWith(redis.listName, json);
    expect(client.setAsync).toHaveBeenCalledTimes(1);
    expect(client.setAsync).toHaveBeenCalledWith(
      redis.existPrefix + data.id,
      data.id
    );

    expect(client.getAsync).toHaveBeenCalledTimes(1);
    expect(client.getAsync).toHaveBeenCalledWith(redis.existPrefix + data.id);

    await catchBlockTest("rpushAsync", redis.addToList);
    await catchBlockTest("setAsync", redis.addToList);
  });

  it("'addToList' method, if 'patientId' already in Redis", async () => {
    client.getAsync.mockResolvedValue(99);

    expect(await redis.addToList(data)).toBeUndefined();
    expect(client.rpushAsync).toHaveBeenCalledTimes(0);
    expect(client.setAsync).toHaveBeenCalledTimes(0);
  });

  it("'inQueue' method, check if 'patientId' in Redis", async () => {
    client.getAsync.mockResolvedValue(99);

    expect(await redis.inQueue(99)).toBeTruthy();
    expect(client.getAsync).toHaveBeenCalledTimes(1);
    expect(client.getAsync).toHaveBeenCalledWith(redis.existPrefix + 99);

    client.getAsync.mockResolvedValue(null);
    expect(await redis.inQueue(98)).toBeFalsy();

    await catchBlockTest("getAsync", redis.inQueue);
  });

  it("'create' method", async () => {
    expect(await redis.create(99, "hello", TTL)).toBeUndefined();
    expect(client.setexAsync).toHaveBeenCalledTimes(1);
    expect(client.setexAsync).toHaveBeenCalledWith(
      redis.prefix + 99,
      TTL,
      "hello"
    );

    await catchBlockTest("setexAsync", redis.create);
  });

  it("'findById' method", async () => {
    client.getAsync.mockResolvedValue("hello");
    expect(await redis.findById(99)).toEqual({
      patient_id: 99,
      resolution: "hello",
    });
    expect(client.getAsync).toHaveBeenCalledTimes(1);
    expect(client.getAsync).toHaveBeenCalledWith(redis.prefix + 99);

    client.getAsync.mockResolvedValue(null);
    expect(await redis.findById(99)).toBeNull();

    await catchBlockTest("getAsync", redis.findById);
  });

  it("'deleteById' method", async () => {
    client.delAsync.mockResolvedValue(1);
    expect(await redis.deleteById(99)).toBe(1);
    expect(client.delAsync).toHaveBeenCalledTimes(1);
    expect(client.delAsync).toHaveBeenCalledWith(redis.prefix + 99);

    client.delAsync.mockResolvedValue(null);
    expect(await redis.deleteById(99)).toBeNull();

    await catchBlockTest("delAsync", redis.deleteById);
  });
});
