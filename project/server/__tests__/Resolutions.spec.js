const request = require("supertest");
const app = require("../src/app");
const resolutionsService = require("../src/components/resolutions/ResolutionsService");

//clearStorage
beforeEach(() => {
  resolutionsService.destroyStorage();
});

async function addResolution(patient = { name: "mia", resolution: "blabla" }) {
  return request(app).post("/api/resolutions").send(patient);
}

async function getResolution(name) {
  return request(app).get(`/api/resolutions/${name}`).send();
}

async function deleteResolution(name) {
  return request(app).delete(`/api/resolutions/${name}`).send();
}

/**
 * STORAGE: ADD (POST)
 */

describe("Key-value STORAGE: add (POST) to storage functionality", () => {
  it("returns 200 OK when POST req is done, patient added to storage", async () => {
    const res = await addResolution();
    expect(res.status).toBe(201);
  });

  it("returns success message when patient added to storage", async () => {
    const res = await addResolution();
    expect(res.body.message).toBe("Resolution added to storage");
  });

  it("added patient to storage with keys 'name' and 'resolution'", async () => {
    await addResolution();
    const patients = await resolutionsService.getAllResolutions();
    expect(patients[0].name).toBe("mia");
    expect(patients[0].resolution).toBe("blabla");
  });

  it("returns 404 and error message if req.body.resolution is invalid", async () => {
    const res = await addResolution({ name: "mia" });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Resolution cannot be empty");
  });
});

/**
 * STORAGE: GET
 */

describe("Key-value STORAGE: GET from storage functionality", () => {
  it("returns 200 OK when GET req is done", async () => {
    await addResolution();
    const res = await getResolution("mia");
    expect(res.status).toBe(200);
  });

  it("returns existing patient when GET request is done", async () => {
    await addResolution();
    await addResolution({ name: "vincent", resolution: "coca-cola" });
    const res = await getResolution("mia");
    expect(res.body).toStrictEqual({ name: "mia", resolution: "blabla" });
  });

  it("returns existing patient with keys 'name' and 'resolution' when GET request is done", async () => {
    await addResolution();
    const res = await getResolution("mia");
    expect(res.body.name).toBe("mia");
    expect(res.body.resolution).toBe("blabla");
  });

  it("returns 404 when the patient is not found", async () => {
    await addResolution();
    const res = await getResolution("vincent");
    expect(res.status).toBe(404);
  });

  it("returns message when the patient is not found", async () => {
    await addResolution();
    const res = await getResolution("vincent");
    expect(res.body.message).toBe("Resolution not found");
  });
});

/**
 * STORAGE: DELETE
 */

describe("Key-value STORAGE: DELETE from storage functionality", () => {
  it("deleted patient when DELETE req is done", async () => {
    await addResolution();
    await deleteResolution("mia");
    const patients = await resolutionsService.getAllResolutions();
    expect(patients.length).toEqual(0);
  });

  it("deleted just patient 'mia', when req.body.params is 'mia'", async () => {
    await addResolution();
    await addResolution({ name: "vincent", resolution: "coca-cola" });
    await deleteResolution("mia");
    const patients = await resolutionsService.getAllResolutions();
    expect(patients[0].name).toBe("vincent");
  });

  it("returns 200 OK when DELETE req is done", async () => {
    await addResolution();
    const res = await deleteResolution("mia");
    expect(res.status).toBe(200);
  });

  it("returns succes message when resolution deleted", async () => {
    await addResolution();
    const res = await deleteResolution("mia");
    expect(res.body.message).toBe("Resolution successfully deleted");
  });

  it("returns 404 and message if resolution not found", async () => {
    await addResolution();
    const res = await deleteResolution("miaaaa");
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Resolution not found");
  });
});
