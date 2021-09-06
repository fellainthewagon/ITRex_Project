const ResolutionRedis = require("../../src/components/storage/resolutionStorage/resolutionRedis");

const resolutionRedis = new ResolutionRedis();

/**
 * mocking funcs
 */
const client = (resolutionRedis.client = jest.fn());
client.setexAsync = jest.fn();
client.getAsync = jest.fn();
client.delAsync = jest.fn();

/**
 *  vars
 */
const TTL = 30;

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
describe("'ResolutionRedis' class", () => {
  it("'create' method", async () => {
    expect(await resolutionRedis.create(99, "hello", TTL)).toBeUndefined();
    expect(client.setexAsync).toHaveBeenCalledTimes(1);
    expect(client.setexAsync).toHaveBeenCalledWith(
      resolutionRedis.prefix + 99,
      TTL,
      "hello"
    );

    await catchBlockTest("setexAsync", resolutionRedis.create);
  });

  it("'findById' method", async () => {
    client.getAsync.mockResolvedValue("hello");
    expect(await resolutionRedis.findById(99)).toEqual({
      patient_id: 99,
      resolution: "hello",
    });
    expect(client.getAsync).toHaveBeenCalledTimes(1);
    expect(client.getAsync).toHaveBeenCalledWith(resolutionRedis.prefix + 99);

    client.getAsync.mockResolvedValue(null);
    expect(await resolutionRedis.findById(99)).toBeNull();

    await catchBlockTest("getAsync", resolutionRedis.findById);
  });

  it("'deleteById' method", async () => {
    client.delAsync.mockResolvedValue(1);
    expect(await resolutionRedis.deleteById(99)).toBe(1);
    expect(client.delAsync).toHaveBeenCalledTimes(1);
    expect(client.delAsync).toHaveBeenCalledWith(resolutionRedis.prefix + 99);

    client.delAsync.mockResolvedValue(null);
    expect(await resolutionRedis.deleteById(99)).toBeNull();

    await catchBlockTest("delAsync", resolutionRedis.deleteById);
  });
});
