require("dotenv").config();
const request = require("supertest");
const app = require("../src/app");
const queueService = require("../src/components/queue/queueService");

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
  it("returns 201 and success message when POST request is done", async () => {
    const res = await addPersonToQueue({ key: "mia" });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Person added to Queue");
  });

  // it("returns success body.message when person added to queue", async () => {
  //   const res = await addPersonToQueue({ key: "mia" });
  // });
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

  it("returns next person from queue when GET request is done", async () => {
    await addPersonToQueue({ key: "mia" });
    await addPersonToQueue({ key: "vincent" });
    await addPersonToQueue({ key: "jules" });
    const res = await getPersonFromQueue();
    expect(res.body).toStrictEqual({ key: "vincent" });
  });
});

/**
 * FIFO: GET first
 */

describe("FIFO: get first person for reloading page (without deleting)", () => {
  it("returns 200 OK when GET request is done", async () => {
    const res = await getFirstPersonFromQueue();
    expect(res.status).toBe(200);
  });

  it("returns body.message when queue is empty", async () => {
    const res = await getFirstPersonFromQueue();
    console.log(res.body);
    expect(res.body.message).toBe("The Queue is empty");
  });
});
