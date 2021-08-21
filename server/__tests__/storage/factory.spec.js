const Factory = require("../../src/components/storage/factory");
const Memory = require("../../src/components/storage/memory");
const Redis = require("../../src/components/storage/redis");

it("Factory", () => {
  expect(Factory.create("redis")).toBeInstanceOf(Redis);
  expect(Factory.create("memory")).toBeInstanceOf(Memory);
  expect(() => {
    Factory.create("non-existen");
  }).toThrow("This type of storage is not supported!");
});
