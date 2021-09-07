const ResolutionFactory = require("../../src/components/resolutions/resolutionRepositories/resolutionFactory");
const ResolutionMemory = require("../../src/components/resolutions/resolutionRepositories/resolutionMemory");
const ResolutionRedis = require("../../src/components/resolutions/resolutionRepositories/resolutionRedis");
const ResolutionStorage = require("../../src/components/resolutions/resolutionRepositories/resolutionStorage");
const { UNSUPPORTED_TYPE } = require("../../src/constants");

it("ResolutionFactory", () => {
  expect(ResolutionFactory.create("memory")).toBeInstanceOf(ResolutionMemory);
  expect(ResolutionFactory.create("redis")).toBeInstanceOf(ResolutionRedis);
  expect(ResolutionFactory.create("storage")).toBeInstanceOf(ResolutionStorage);
  expect(() => {
    ResolutionFactory.create("non-existen");
  }).toThrow(UNSUPPORTED_TYPE);
});
