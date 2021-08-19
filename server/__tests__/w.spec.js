const request = require("supertest");
const app = require("../src/app");

jest.mock("../src/components/queue/queueController", () => ({
  getCurrentPerson: jest.fn(),
  getNextPerson: jest.fn(),
  addPerson: jest.fn(),
}));

const mockqueueController = require("../src/components/queue/queueController");

function addPersonToQueue() {
  return request(app).post("/api/queue").send({ key: "mia" });
}

function getPersonFromQueue() {
  return request(app).get("/api/queue/next").send();
}

function getCurrentPerson() {
  return request(app).get("/api/queue/current").send();
}

/**
 * FIFO: GET current (first)
 */

describe("FIFO: get first person for reloading page (without deleting)", () => {
  it("returns 200 OK and 'res.body' when GET request is done", async () => {
    // const resFirst = await getCurrentPerson();
    // expect(resFirst.body.message).toBe("The Queue is empty");
    mockqueueController.getCurrentPerson.mockResolvedValueOnce({ key: "mia" });

    await addPersonToQueue();
    const resSecond = await getCurrentPerson();
    // expect(resSecond.body).toEqual({ key: "mia" });
    expect(resSecond.status).toBe(200);
    expect(mockqueueController.getCurrentPerson).toHaveBeenCalledTimes(1);
  });
});

// describe("FIFO: get from queue functionality ('next' button)", () => {
//   it("returns 200 OK and when GET request is done", async () => {
//     const res = await getPersonFromQueue();
//     expect(res.body.message).toBe("The Queue is empty");
//     expect(res.status).toBe(200);
//   });
// });

// describe("FIFO: add to queue functionality ('add' button)", () => {
//   it("returns 201 and success message when POST request is done", async () => {
//     const res = await addPersonToQueue();
//     expect(res.status).toBe(201);
//     expect(res.body.message).toBe("Person added to Queue");
//   });
// });
