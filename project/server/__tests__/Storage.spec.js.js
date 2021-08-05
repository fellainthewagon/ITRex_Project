const request = require("supertest");
const app = require("../src/app");
const patientsService = require("../src/components/patients/PatientsService");

//clearStorage
beforeEach(() => {
  patientsService.destroyStorage();
});

async function addPatientToStorage(
  patient = { name: "mia", resolution: "blabla" }
) {
  return request(app).post("/patients").send(patient);
}

async function getPatientFromStorage(name) {
  return request(app).get(`/patients/${name}`).send();
}

async function deletePatientFromStorage(name) {
  return request(app).delete(`/patients/${name}`).send();
}

/**
 * STORAGE: ADD (POST)
 */

describe("Key-value STORAGE: add (POST) to storage functionality", () => {
  it("returns 200 OK when POST req is done, patient added to storage", async () => {
    const res = await addPatientToStorage();
    expect(res.status).toBe(200);
  });

  it("returns success message when patient added to storage", async () => {
    const res = await addPatientToStorage();
    expect(res.body.message).toBe("Patient added to storage");
  });

  it("added patient to storage with keys 'name' and 'resolution'", async () => {
    await addPatientToStorage();
    const patients = await patientsService.getAllpatients();
    expect(patients[0].name).toBe("mia");
    expect(patients[0].resolution).toBe("blabla");
  });
});

/**
 * STORAGE: GET
 */

describe("Key-value STORAGE: GET from storage functionality", () => {
  it("returns 200 OK when GET req is done", async () => {
    await addPatientToStorage();
    const res = await getPatientFromStorage("mia");
    expect(res.status).toBe(200);
  });

  it("returns existing patient when GET request is done", async () => {
    await addPatientToStorage();
    await addPatientToStorage({ name: "vincent", resolution: "coca-cola" });
    const res = await getPatientFromStorage("mia");
    expect(res.body).toStrictEqual({ name: "mia", resolution: "blabla" });
  });

  it("returns existing patient with keys 'name' and 'resolution' when GET request is done", async () => {
    await addPatientToStorage();
    const res = await getPatientFromStorage("mia");
    expect(res.body.name).toBe("mia");
    expect(res.body.resolution).toBe("blabla");
  });

  it("returns 404 when the patient is not found", async () => {
    await addPatientToStorage();
    const res = await getPatientFromStorage("vincent");
    expect(res.status).toBe(404);
  });

  it("returns message when the patient is not found", async () => {
    await addPatientToStorage();
    const res = await getPatientFromStorage("vincent");
    expect(res.body.message).toBe("Patient not found");
  });
});

/**
 * STORAGE: DELETE (without TTL пока что)
 */

describe("Key-value STORAGE: DELETE from storage functionality", () => {
  it("deleted patient when DELETE req is done", async () => {
    await addPatientToStorage();
    await deletePatientFromStorage("mia");
    const patients = await patientsService.getAllpatients();
    expect(patients.length).toEqual(0);
  });

  it("deleted just patient 'mia', when req.body.params is 'mia'", async () => {
    await addPatientToStorage();
    await addPatientToStorage({ name: "vincent", resolution: "coca-cola" });
    await deletePatientFromStorage("mia");
    const patients = await patientsService.getAllpatients();
    expect(patients[0].name).toBe("vincent");
  });

  it("returns 200 OK when DELETE req is done", async () => {
    await addPatientToStorage();
    const res = await deletePatientFromStorage("mia");
    expect(res.status).toBe(200);
  });

  it("returns succes message when patient deleted", async () => {
    await addPatientToStorage();
    const res = await deletePatientFromStorage("mia");
    expect(res.body.message).toBe("Patient successfully deleted");
  });
});
