const ResolutionMemory = require("../../src/components/storage/resolutionStorage/resolutionMemory");

const resolutionMemory = new ResolutionMemory();

/**
 * mocking funcs
 */
resolutionMemory.search = jest.fn();
resolutionMemory.remove = jest.fn();
Date.now = jest.fn();

/**
 *  vars
 */
const data = {
  patient_id: "55",
  resolution: "hello",
  expire_timestamp: 1000,
};

beforeEach(() => {
  jest.clearAllMocks();
  resolutionMemory.resolutions = [data];
});

afterEach(() => {
  resolutionMemory.resolutions = [];
});

/**
 * TEST
 */
describe("'ResolutionMemory' storage class", () => {
  it("'create' method", async () => {
    expect(resolutionMemory.resolutions.length).toBe(1);
    await resolutionMemory.create("56", "Yeahh!", 100);
    expect(resolutionMemory.resolutions.length).toBe(2);
    expect(Date.now).toHaveBeenCalledTimes(1);
  });

  it("'findById' method, if the 'TTL' has not expired", async () => {
    resolutionMemory.search.mockResolvedValue(data);
    Date.now.mockReturnValue(999);

    expect(await resolutionMemory.findById(55)).toEqual(data);
    expect(resolutionMemory.search).toHaveBeenCalledWith("55");
    expect(resolutionMemory.search).toHaveBeenCalledTimes(1);
    expect(resolutionMemory.remove).toHaveBeenCalledTimes(0);
    expect(Date.now).toHaveBeenCalledTimes(1);
  });

  it("'findById' method, if the 'TTL' expired", async () => {
    resolutionMemory.search.mockResolvedValue(data);
    Date.now.mockReturnValue(1001);

    expect(await resolutionMemory.findById(55)).toBeNull();
    expect(resolutionMemory.remove).toHaveBeenCalledWith("55");
    expect(resolutionMemory.remove).toHaveBeenCalledTimes(1);
    expect(Date.now).toHaveBeenCalledTimes(1);
  });

  it("'deleteById' method, if the 'patient' is in the storage", async () => {
    resolutionMemory.search.mockResolvedValue(data);
    resolutionMemory.remove.mockResolvedValue(true);

    expect(await resolutionMemory.deleteById("55")).toBe(true);
    expect(resolutionMemory.remove).toHaveBeenCalledTimes(1);
  });

  it("'deleteById' method, if the 'patient' isn't in the storage", async () => {
    resolutionMemory.search.mockResolvedValue(undefined);

    expect(await resolutionMemory.deleteById("55")).toBeNull();
    expect(resolutionMemory.search).toHaveBeenCalledWith("55");
    expect(resolutionMemory.search).toHaveBeenCalledTimes(1);
    expect(resolutionMemory.remove).toHaveBeenCalledTimes(0);

    resolutionMemory.search.mockResolvedValue(null);
    expect(await resolutionMemory.deleteById("55")).toBeNull();
  });

  it("'search' and 'remove' secondary halper methods", async () => {
    const resolutionMemory = new ResolutionMemory();
    resolutionMemory.resolutions = [data];

    expect(await resolutionMemory.search("55")).toEqual(data);
    expect(await resolutionMemory.search("54")).toBe(undefined);
    expect(await resolutionMemory.remove("55")).toBe(true);
    expect(await resolutionMemory.search("55")).toBeNull();
  });
});
