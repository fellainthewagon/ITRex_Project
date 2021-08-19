require("dotenv").config();
const ResolutionRedisStorage = require("../../src/components/resolutions/resolutionRedisStorage");
const DatabaseException = require("../../src/errors/databaseException");
const redis = require("../../src/redis");

const storage = {
  host: process.env.REDIS_HOST,
  port: process.env.TEST_REDIS_PORT,
  type: "redis_resolution",
};
const client = redis.createClient(`redis://${storage.host}:${storage.port}/1`);

const value = { key: "vinny", resolution: "booom" };
const TTL = 30;

const resolutionRedisStorage = new ResolutionRedisStorage(
  storage,
  redis,
  DatabaseException
);

afterAll(() => jest.restoreAllMocks());
afterEach(async () => await client.flushallAsync());

describe("ResolutionRedisStorage class", () => {
  it("init class, create instance with props and methods", () => {
    expect(resolutionRedisStorage).toBeInstanceOf(ResolutionRedisStorage);
    expect(resolutionRedisStorage.exception).toBeDefined();
    expect(resolutionRedisStorage.client).toBeDefined();
    expect(resolutionRedisStorage.create).toBeDefined();
    expect(resolutionRedisStorage.findByKey).toBeDefined();
    expect(resolutionRedisStorage.deleteByKey).toBeDefined();
  });
});

describe("'create' method", () => {
  jest.spyOn(resolutionRedisStorage, "create");

  it("added resolution to key-value storage", async () => {
    await resolutionRedisStorage.create(value, TTL);
    expect(await client.getAsync(value.key)).toEqual(value.resolution);
    expect(resolutionRedisStorage.create).toHaveBeenCalledTimes(1);
  });

  it("TTL to be defined", async () => {
    await resolutionRedisStorage.create(value, TTL);
    expect(await client.ttlAsync(value.key)).toBeDefined();
  });
});

describe("'findByKey' method", () => {
  jest.spyOn(resolutionRedisStorage, "findByKey");

  it("added resolution to key-value storage", async () => {
    await client.setexAsync(value.key, TTL, value.resolution);
    expect(await resolutionRedisStorage.findByKey(value.key)).toEqual(value);
    expect(resolutionRedisStorage.findByKey).toHaveBeenCalledTimes(1);
  });

  it("returns 'null' if the key not found", async () => {
    await client.setexAsync(value.key, TTL, value.resolution);
    expect(
      await resolutionRedisStorage.findByKey("not existing key")
    ).toBeNull();
  });
});

describe("'deleteByKey' method", () => {
  jest.spyOn(resolutionRedisStorage, "deleteByKey");

  it("it returns 'true' if deleting successfully done", async () => {
    await client.setexAsync(value.key, TTL, value.resolution);
    expect(await resolutionRedisStorage.deleteByKey(value.key)).toBeTruthy();
    expect(resolutionRedisStorage.deleteByKey).toHaveBeenCalledTimes(1);
  });

  it("returns 'null' after deleting if the key doesn't exist", async () => {
    await client.setexAsync(value.key, TTL, value.resolution);
    expect(
      await resolutionRedisStorage.findByKey("not existing key")
    ).toBeNull();
  });
});
