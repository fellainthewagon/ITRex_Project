const Redis = require("../../src/components/storage/redis");
const DatabaseException = require("../../src/errors/databaseException");

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

/**
 *  vars
 */
const TTL = 30;
const data = { id: 99, name: "mia" };
const json = JSON.stringify(data);

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
    client.lpopAsync.mockResolvedValue();
    client.lindexAsync.mockResolvedValue(json);

    expect(await redis.getNextFromList()).toEqual(data);
    expect(client.lpopAsync).toHaveBeenCalledTimes(1);
    expect(client.lpopAsync).toHaveBeenCalledWith(redis.listName);

    client.lindexAsync.mockResolvedValue(null);
    expect(await redis.getNextFromList()).toBeNull();

    await catchBlockTest("lpopAsync", redis.getNextFromList);
  });

  it("'addToList' method", async () => {
    expect(await redis.addToList(data)).toBeUndefined();
    expect(client.rpushAsync).toHaveBeenCalledTimes(1);
    expect(client.rpushAsync).toHaveBeenCalledWith(redis.listName, json);

    await catchBlockTest("rpushAsync", redis.addToList);
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
      patientId: 99,
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

  it("'DatabaseException' throwing", async () => {
    client.delAsync.mockResolvedValue(() => {
      throw new DatabaseException();
    });
    expect(await redis.deleteById()).toThrow(DatabaseException);
  });
});
