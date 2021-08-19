require("dotenv").config();
const config = require("../../config");
const resolutionsService = require("../../src/components/resolutions/resolutionsService");
const Factory = require("../../src/components/storageFactory");
const Redis = require("../../src/components/storageFactory/redis");

// const redis = Factory.create(config.resolutionsStorage);

beforeEach(() => jest.clearAllMocks());

describe("'create' method", () => {
  it("returns", async () => {
    const create = (Redis.prototype.create = jest.fn());
    const result = await resolutionsService.add("mia", "value", 30);

    expect(result).toBeUndefined();
    expect(create).toHaveBeenCalledWith("mia", "value", 30);
    expect(create).toHaveBeenCalledTimes(1);
  });
});
