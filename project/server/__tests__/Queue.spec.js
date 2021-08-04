const request = require("supertest");
const app = require("../src/app");
const dataService = require("../src/data/DataService");

//clearQueue
beforeEach(() => {
  dataService.destroy();
});

function addPersonToQueue(person) {
  return request(app).post("/queue").send(person);
}

describe("FIFO: add to queue functionality ('add' button)", () => {
  it("returns 200 OK when POST request is done", async () => {
    const res = await addPersonToQueue({ name: "mia" });
    expect(res.status).toBe(200);
  });

  it("returns success body.message when person added to queue", async () => {
    const res = await addPersonToQueue({ name: "mia" });
    expect(res.body.message).toBe("Person added to queue");
  });

  it("after add 'vincent' to the queue, last person in queue is 'vincent'", async () => {
    await addPersonToQueue({ name: "mia" });
    await addPersonToQueue({ name: "vincent" });
    const persons = await dataService.getAll();
    const lastPerson = persons[persons.length - 1];
    expect(lastPerson.name).toBe("vincent");
  });

  it("after add 'vincent' to queue, last person is not to be 'mia'", async () => {
    await addPersonToQueue({ name: "mia" });
    await addPersonToQueue({ name: "vincent" });
    const persons = await dataService.getAll();
    const lastPerson = persons[persons.length - 1];
    expect(lastPerson.name).not.toBe("mia");
  });

  it("after add 3 persons, queue length is equal 3", async () => {
    await addPersonToQueue({ name: "mia" });
    await addPersonToQueue({ name: "vincent" });
    await addPersonToQueue({ name: "jules" });
    const persons = await dataService.getAll();
    expect(persons.length).toBe(3);
  });

  // мы дог на митинге добавлять в очередь только уникальных пациентов
  it("after add 2 persons with the same name, queue length to be equal is 1", async () => {
    await addPersonToQueue({ name: "mia" });
    await addPersonToQueue({ name: "mia" });
    const persons = await dataService.getAll();
    expect(persons.length).toBe(1);
  });
});

describe("FIFO: get from queue functionality ('next' button)", () => {
  function getPersonFromQueue() {
    return request(app).get("/patients/next").send();
  }

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
   * перезагрузке.
   * */

  it("returns second (but first for UI) person when GET request is done", async () => {
    await addPersonToQueue({ name: "mia" });
    await addPersonToQueue({ name: "vincent" });
    await addPersonToQueue({ name: "jules" });
    const res = await getPersonFromQueue();
    expect(res.body).toStrictEqual({ name: "vincent" });
  });

  it("after add 3 persons and GET request, queue length to be equal is 2", async () => {
    await addPersonToQueue({ name: "mia" });
    await addPersonToQueue({ name: "vincent" });
    await addPersonToQueue({ name: "jules" });
    await getPersonFromQueue();
    const persons = await dataService.getAll();
    expect(persons.length).toBe(2);
  });
});

describe("FIFO: get first person for reloading page (without deleting)", () => {
  function getFirstPersonFromQueue() {
    return request(app).get("/queue/first").send();
  }

  it("returns 200 OK when GET request is done", async () => {
    const res = await getFirstPersonFromQueue();
    expect(res.status).toBe(200);
  });

  it("returns body.message when queue is empty", async () => {
    const res = await getFirstPersonFromQueue();
    expect(res.body.message).toBe("The Queue is empty");
  });

  it("returns first person from queue without deleting him", async () => {
    await addPersonToQueue({ name: "mia" });
    await addPersonToQueue({ name: "vincent" });
    const res = await getFirstPersonFromQueue();
    const persons = await dataService.getAll();
    expect(res.body).toStrictEqual({ name: "mia" });
    expect(persons[0]).toStrictEqual({ name: "mia" });
    expect(persons.length).toBe(2);
  });
});
