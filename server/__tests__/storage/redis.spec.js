const Redis = require("../../src/components/storage/redis");
const DatabaseException = require("../../src/errors/databaseException");

beforeEach(() => jest.clearAllMocks());

describe("'Redis' class", () => {
  const redis = new Redis();

  const client = (redis.client = jest.fn());
  client.lindexAsync = jest.fn();
  client.lpopAsync = jest.fn();
  client.rpushAsync = jest.fn();
  client.setexAsync = jest.fn();
  client.getAsync = jest.fn();
  client.delAsync = jest.fn();
  const TTL = 30;

  it("'getFirstFromList' method", async () => {
    client.lindexAsync.mockResolvedValue("mia");
    expect(await redis.getFirstFromList()).toEqual("mia");
    expect(client.lindexAsync).toHaveBeenCalledTimes(1);
    expect(client.lindexAsync).toHaveBeenCalledWith(redis.listName, 0);

    client.lindexAsync.mockResolvedValue(null);
    expect(await redis.getFirstFromList()).toEqual(null);
  });

  it("'popFromList' method", async () => {
    client.lpopAsync.mockResolvedValue("mia");
    expect(await redis.popFromList()).toBeUndefined();
    expect(client.lpopAsync).toHaveBeenCalledTimes(1);
    expect(client.lpopAsync).toHaveBeenCalledWith(redis.listName);

    client.lpopAsync.mockResolvedValue(null);
    expect(await redis.popFromList()).toBeUndefined();
  });

  it("'addToList' method", async () => {
    expect(await redis.addToList("mia")).toBeUndefined();
    expect(client.rpushAsync).toHaveBeenCalledTimes(1);
    expect(client.rpushAsync).toHaveBeenCalledWith(redis.listName, "mia");
  });

  it("'create' method", async () => {
    expect(await redis.create("mia", "hello node.js", TTL)).toBeUndefined();
    expect(client.setexAsync).toHaveBeenCalledTimes(1);
    expect(client.setexAsync).toHaveBeenCalledWith("mia", TTL, "hello node.js");
  });

  it("'findById' method", async () => {
    client.getAsync.mockResolvedValue("hello node.js");
    expect(await redis.findById("mia")).toEqual("hello node.js");
    expect(client.getAsync).toHaveBeenCalledTimes(1);
    expect(client.getAsync).toHaveBeenCalledWith("mia");

    client.getAsync.mockResolvedValue(null);
    expect(await redis.findByName("mia")).toEqual(null);
  });

  it("'deleteById' method", async () => {
    client.delAsync.mockResolvedValue("hello node.js");
    expect(await redis.deleteById("mia")).toEqual("hello node.js");
    expect(client.delAsync).toHaveBeenCalledTimes(1);
    expect(client.delAsync).toHaveBeenCalledWith("mia");

    client.delAsync.mockResolvedValue(null);
    expect(await redis.deleteById("mia")).toEqual(null);
  });

  it("'DatabaseException' throwing", async () => {
    client.delAsync.mockResolvedValue(() => {
      throw new DatabaseException();
    });
    expect(await redis.deleteById()).toThrow(DatabaseException);
  });
});
