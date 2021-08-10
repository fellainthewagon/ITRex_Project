const request = require("supertest");
const app = require("../src/app");
const queueService = require("../src/components/queue/QueueService");

//clearQueue
beforeEach(async () => {
  await queueService.destroyQueue();
});

function addPersonToQueue(person) {
  return request(app).post("/api/queue").send(person);
}

function getPersonFromQueue() {
  return request(app).get("/api/queue/next").send();
}

function getFirstPersonFromQueue() {
  return request(app).get("/api/queue/current").send();
}

/**
 * FIFO: ADD
 */

describe("FIFO: add to queue functionality ('add' button)", () => {
  it("returns 200 OK when POST request is done", async () => {
    const res = await addPersonToQueue({ key: "mia" });
    expect(res.status).toBe(201);
  });

  it("returns success body.message when person added to queue", async () => {
    const res = await addPersonToQueue({ key: "mia" });
    expect(res.body.message).toBe("Person added to queue");
  });

  it("after add 'vincent' to the queue, last person in queue is 'vincent'", async () => {
    await addPersonToQueue({ key: "mia" });
    await addPersonToQueue({ key: "vincent" });
    const queue = await queueService.getAllpersons();
    const lastPerson = queue[queue.length - 1];
    expect(lastPerson.key).toBe("vincent");
  });

  it("after add 3 persons, queue length is equal 3", async () => {
    await addPersonToQueue({ key: "mia" });
    await addPersonToQueue({ key: "vincent" });
    await addPersonToQueue({ key: "jules" });
    const queue = await queueService.getAllpersons();
    expect(queue.length).toBe(3);
  });

  it("after add 2 persons with the same key, queue length to be equal is 1", async () => {
    await addPersonToQueue({ key: "mia" });
    await addPersonToQueue({ key: "mia" });
    const queue = await queueService.getAllpersons();
    expect(queue.length).toBe(1);
  });

  it("returns 400 and error message when body is not valid", async () => {
    const res = await addPersonToQueue({ age: 44 });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid body");
  });
});

/**
 * FIFO: GET
 */

describe("FIFO: get from queue functionality ('next' button)", () => {
  it("returns 200 OK when GET request is done", async () => {
    const res = await getPersonFromQueue();
    expect(res.status).toBe(200);
  });

  it("returns body.message when queue is empty", async () => {
    const res = await getPersonFromQueue();
    expect(res.body.message).toBe("The Queue is empty");
  });

  /**
   * здесь метод "get" я реализовал таким образом, что он забирает
   * всегда второй элемент из очереди а не первый. Первый нужен для
   * отображения актуального клиента на странице при ее загрузке или
   * перезагрузке. Бизнес-логика при этом соблюдена
   * */

  it("returns next person from queue when GET request is done", async () => {
    await addPersonToQueue({ key: "mia" });
    await addPersonToQueue({ key: "vincent" });
    await addPersonToQueue({ key: "jules" });
    const res = await getPersonFromQueue();
    expect(res.body).toStrictEqual({ key: "vincent" });
  });

  it("after add 3 persons and GET request, queue length to be equal is 2", async () => {
    await addPersonToQueue({ key: "mia" });
    await addPersonToQueue({ key: "vincent" });
    await addPersonToQueue({ key: "jules" });
    await getPersonFromQueue();
    const queue = await queueService.getAllpersons();
    expect(queue.length).toBe(2);
  });
});

describe("FIFO: get first person for reloading page (without deleting)", () => {
  it("returns 200 OK when GET request is done", async () => {
    const res = await getFirstPersonFromQueue();
    expect(res.status).toBe(200);
  });

  it("returns body.message when queue is empty", async () => {
    const res = await getFirstPersonFromQueue();
    expect(res.body.message).toBe("The Queue is empty");
  });

  it("returns first person from queue without deleting him", async () => {
    await addPersonToQueue({ key: "mia" });
    await addPersonToQueue({ key: "vincent" });
    const res = await getFirstPersonFromQueue();
    const queue = await queueService.getAllpersons();
    expect(res.body).toStrictEqual({ key: "mia" });
    expect(queue[0]).toStrictEqual({ key: "mia" });
    expect(queue.length).toBe(2);
  });
});
