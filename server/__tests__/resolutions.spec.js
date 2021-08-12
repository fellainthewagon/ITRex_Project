const request = require("supertest");
const app = require("../src/app");
const resolutionsService = require("../src/components/resolutions/resolutionsService");

const ttl = 30000;

//clearStorage
beforeEach(() => {
  resolutionsService.destroyStorage();
});

async function addResolution(
  key = "mia",
  resolution = { resolution: "blabla" }
) {
  return request(app).post(`/api/patients/${key}/resolution`).send(resolution);
}

async function getResolution(key) {
  return request(app).get(`/api/patients/${key}/resolution`).send();
}

async function deleteResolution(key) {
  return request(app).delete(`/api/patients/${key}/resolution`).send();
}

/**
 * STORAGE: ADD (POST)
 */

describe("Key-value STORAGE: add (POST) to storage functionality", () => {
  it("returns 201 OK when POST req is done", async () => {
    const res = await addResolution();
    expect(res.status).toBe(201);
  });

  it("returns created resolution after successfull POST req", async () => {
    const res = await addResolution("vic", {
      resolution: "piu-piu",
    });
    expect(res.body.resolution).toStrictEqual({
      key: "vic",
      resolution: "piu-piu",
    });
  });

  it("returns success message when resolution added to storage", async () => {
    const res = await addResolution();
    expect(res.body.message).toBe("Resolution added to storage");
  });

  it("added patient to storage with 'key' and 'resolution' properties", async () => {
    await addResolution();
    const res = await getResolution("mia");
    expect(res.body.key).toBeDefined();
    expect(res.body.resolution).toBeDefined();
  });

  it("returns 400 and error message when body is not valid", async () => {
    const res = await addResolution("vic", { age: 44 });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid body");
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
    await addResolution("vincent", { resolution: "coca-cola" });
    const res = await getResolution("mia");
    expect(res.body).toStrictEqual({ key: "mia", resolution: "blabla" });
  });

  it("returns existing patient with keys 'key' and 'resolution' when GET request is done", async () => {
    await addResolution();
    const res = await getResolution("mia");
    expect(res.body.key).toBe("mia");
    expect(res.body.resolution).toBe("blabla");
  });

  it("returns 404 not found and info message when the patient is not found", async () => {
    await addResolution();
    const res = await getResolution("vincent");
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Resolution not found");
  });
});

/**
 * STORAGE: DELETE
 */

describe("Key-value STORAGE: DELETE from storage functionality", () => {
  it("returns 200 OK when DELETE req is done", async () => {
    await addResolution();
    const res = await deleteResolution("mia");
    expect(res.status).toBe(200);
  });

  it("deleted patient when DELETE req is done", async () => {
    await addResolution();
    await deleteResolution("mia");
    const resolutions = await resolutionsService.getAllResolutions();
    expect(resolutions.length).toEqual(0);
  });

  it("deleted just patient 'mia', when req.body.params is 'mia'", async () => {
    await addResolution();
    await addResolution("vincent", { resolution: "coca-cola" });
    await deleteResolution("mia");
    const res = await getResolution("vincent");
    expect(res.body.key).toBe("vincent");
  });

  it("returns succes message when resolution deleted", async () => {
    await addResolution();
    const res = await deleteResolution("mia");
    expect(res.body.message).toBe("Resolution successfully deleted");
  });

  it("returns 404 not found and message if resolution not found", async () => {
    await addResolution();
    const res = await deleteResolution("miaaaa");
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Resolution not found");
  });
});
