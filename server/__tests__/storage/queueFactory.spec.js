const QueueFactory = require("../../src/components/queue/queueRepositories/queueFactory");
const QueueMemory = require("../../src/components/queue/queueRepositories/queueMemory");
const QueueRedis = require("../../src/components/queue/queueRepositories/queueRedis");
const { UNSUPPORTED_TYPE } = require("../../src/constants");

it("QueueFactory", () => {
  expect(QueueFactory.create("memory")).toBeInstanceOf(QueueMemory);
  expect(QueueFactory.create("redis")).toBeInstanceOf(QueueRedis);
  expect(() => {
    QueueFactory.create("non-existen");
  }).toThrow(UNSUPPORTED_TYPE);
});
