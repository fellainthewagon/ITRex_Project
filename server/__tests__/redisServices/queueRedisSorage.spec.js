require("dotenv").config();
const QueueRedisStorage = require("../../src/components/queue/queueRedisStorage");
const DatabaseException = require("../../src/errors/databaseException");
const redis = require("../../src/redis");

const storage = {
  host: process.env.REDIS_HOST,
  port: process.env.TEST_REDIS_PORT,
  type: "redis_queue",
};
const client = redis.createClient(`redis://${storage.host}:${storage.port}/0`);

const basicKey = { key: "donny" };

const queueRedisStorage = new QueueRedisStorage(
  storage,
  redis,
  DatabaseException
);

afterEach(async () => await client.flushallAsync());
afterAll(() => jest.restoreAllMocks());

describe("QueueRedisStorage class", () => {
  it("init class, create instance with props and methods", () => {
    expect(queueRedisStorage).toBeInstanceOf(QueueRedisStorage);
    expect(queueRedisStorage.client).toBeDefined();
    expect(queueRedisStorage.exception).toBeDefined();
    expect(queueRedisStorage.key).toBeDefined();
    expect(queueRedisStorage.getFirst).toBeDefined();
    expect(queueRedisStorage.getNext).toBeDefined();
    expect(queueRedisStorage.add).toBeDefined();
  });
});

describe("'getFirst' method", () => {
  jest.spyOn(queueRedisStorage, "getFirst");

  it("returns 'null' if queue is empty", async () => {
    expect(await queueRedisStorage.getFirst()).toBeNull();
    expect(queueRedisStorage.getFirst).toHaveBeenCalledTimes(1);
  });

  it("returns current (first) person from queue", async () => {
    await queueRedisStorage.add(basicKey);
    await queueRedisStorage.add({ key: "manny" });
    expect(await queueRedisStorage.getFirst()).toEqual(basicKey);
  });
});

describe("'getNext' method", () => {
  jest.spyOn(queueRedisStorage, "getNext");

  it("returns next person from queue", async () => {
    await queueRedisStorage.add(basicKey);
    await queueRedisStorage.add({ key: "manny" });
    expect(await queueRedisStorage.getNext()).toEqual({ key: "manny" });
    expect(queueRedisStorage.getNext).toHaveBeenCalledTimes(1);
  });

  it("returns 'null' if in queue one or zero persons", async () => {
    await queueRedisStorage.add(basicKey);
    expect(await queueRedisStorage.getNext()).toBeNull();
  });
});

describe("'add' method", () => {
  it("queue length is 1, after add person in empty queue", async () => {
    expect(await client.llenAsync("key")).toBe(0);
    await queueRedisStorage.add(basicKey);
    expect(await client.llenAsync("key")).toBe(1);
  });

  it("implements 'queue': first in first out", async () => {
    await queueRedisStorage.add(basicKey);
    await queueRedisStorage.add({ key: "manny" });
    await queueRedisStorage.add({ key: "vinny" });
    expect(await queueRedisStorage.getFirst()).toEqual(basicKey);
  });
});
