const Factory = require("../../src/components/storage/factory");
const QueueMemory = require("../../src/components/storage/queueStorage/queueMemory");
const QueueRedis = require("../../src/components/storage/queueStorage/queueRedis");
const ResolutionMemory = require("../../src/components/storage/resolutionStorage/resolutionMemory");
const ResolutionRedis = require("../../src/components/storage/resolutionStorage/resolutionRedis");
const ResolutionStorage = require("../../src/components/storage/resolutionStorage/resolutionStorage");
const { UNSUPPORTED_TYPE } = require("../../src/constants");

it("Factory", () => {
  expect(Factory.create("queueMemory")).toBeInstanceOf(QueueMemory);
  expect(Factory.create("queueRedis")).toBeInstanceOf(QueueRedis);
  expect(Factory.create("resolutionMemory")).toBeInstanceOf(ResolutionMemory);
  expect(Factory.create("resolutionRedis")).toBeInstanceOf(ResolutionRedis);
  expect(Factory.create("resolutionDatabase")).toBeInstanceOf(
    ResolutionStorage
  );
  expect(() => {
    Factory.create("non-existen");
  }).toThrow(UNSUPPORTED_TYPE);
});
