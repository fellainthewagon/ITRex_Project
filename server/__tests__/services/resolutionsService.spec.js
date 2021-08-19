const resolutionsService = require("../../src/components/resolutions/resolutionsService");

beforeEach(() => jest.clearAllMocks());

describe("'ResolutionsService' class", () => {
  const resolutionsStorage = (resolutionsService.storage = jest.fn());
  resolutionsStorage.create = jest.fn();
  resolutionsStorage.findByName = jest.fn();
  resolutionsStorage.deleteByName = jest.fn();

  it("'add' method", async () => {
    const result = await resolutionsService.add("mia", "hello nodeJS", 30);

    expect(result).toBeUndefined();
    expect(resolutionsStorage.create).toHaveBeenCalledWith(
      "mia",
      "hello nodeJS",
      30
    );
    expect(resolutionsStorage.create).toHaveBeenCalledTimes(1);
    expect(
      await resolutionsStorage.create("mia", "hello nodeJS", 30)
    ).toBeUndefined();
  });

  it("'get' method", async () => {
    resolutionsStorage.findByName.mockResolvedValue("hello nodeJS");
    const result = await resolutionsService.get("mia");

    expect(result).toEqual({ key: "mia", resolution: "hello nodeJS" });
    expect(resolutionsStorage.findByName).toHaveBeenCalledWith("mia");
    expect(resolutionsStorage.findByName).toHaveBeenCalledTimes(1);
    expect(await resolutionsStorage.findByName("mia")).toBe("hello nodeJS");

    resolutionsStorage.findByName.mockResolvedValue(null);
    const result2 = await resolutionsService.get("non-existent name");
    expect(result2).toEqual(null);
  });

  it("'delete' method", async () => {
    resolutionsStorage.deleteByName.mockResolvedValue(1);
    const result = await resolutionsService.delete("mia");

    expect(result).toEqual(1);
    expect(resolutionsStorage.deleteByName).toHaveBeenCalledWith("mia");
    expect(resolutionsStorage.deleteByName).toHaveBeenCalledTimes(1);
    expect(await resolutionsStorage.deleteByName("mia")).toBe(1);

    resolutionsStorage.deleteByName.mockResolvedValue(0);
    const result2 = await resolutionsService.delete("non-existent name");
    expect(result2).toEqual(null);
  });
});
