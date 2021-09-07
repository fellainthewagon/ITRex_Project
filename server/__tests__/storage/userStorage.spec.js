const userStorage = require("../../src/components/repositories/userStorage");

/**
 * mocking funcs
 */
jest.mock("../../src/db");
const db = require("../../src/db");

const objectUser = {};
objectUser.get = jest.fn();

/**
 * vars
 */
const userPatient = {
  id: "e7a0f1f0-0c59-11ec-acf4-3f4b5c85ffb3",
  email: "mia@mail.ru",
  password: "$2a$10$b626iZTDFvDRshqi2lcDa.KuZrJzNysn2eIhvKcjmu/LFWDFkqjsS",
  createdAt: "2021-09-03T01:54:41.000Z",
  updatedAt: "2021-09-03T01:54:41.000Z",
  patient: {
    id: 1,
    user_id: "e7a0f1f0-0c59-11ec-acf4-3f4b5c85ffb3",
    name: "mia",
    createdAt: "2021-09-03T01:54:41.000Z",
    updatedAt: "2021-09-03T01:54:41.000Z",
  },
};
const email = "mia@mail.ru";
const password = "$2a$10$b626iZTDFvDRshqi2lcDa.KuZrJzNysn2eIhvKcjmu/LFWDFkqjsS";
const id = "e7a0f1f0-0c59-11ec-acf4-3f4b5c85ffb3";
const user = {
  id: "e7a0f1f0-0c59-11ec-acf4-3f4b5c85ffb3",
  email: "mia@mail.ru",
  password: "$2a$10$b626iZTDFvDRshqi2lcDa.KuZrJzNysn2eIhvKcjmu/LFWDFkqjsS",
  createdAt: "2021-09-03T01:54:41.000Z",
  updatedAt: "2021-09-03T01:54:41.000Z",
};

beforeEach(() => jest.clearAllMocks());

/**
 * TEST
 */
describe("'UserStorage' class", () => {
  it("'create' method", async () => {
    db.User.create.mockResolvedValue(user);

    expect(await userStorage.create(email, password)).toEqual(user);
    expect(db.User.create).toHaveBeenCalledWith({ email, password });
    expect(db.User.create).toHaveBeenCalledTimes(1);
  });

  it("'findByPk' method, if 'user' is exist", async () => {
    db.User.findByPk.mockResolvedValue(objectUser);
    objectUser.get.mockReturnValue(userPatient);

    expect(await userStorage.findByPk(id)).toEqual(userPatient);
    expect(db.User.findByPk).toHaveBeenCalledWith(id, {
      include: "patient",
    });
    expect(db.User.findByPk).toHaveBeenCalledTimes(1);
    expect(objectUser.get).toHaveBeenCalledWith({ plain: true });
    expect(objectUser.get).toHaveBeenCalledTimes(1);
  });

  it("'findOne' method", async () => {
    db.User.findOne.mockResolvedValue(user);

    expect(await userStorage.findOne(email)).toEqual(user);
    expect(db.User.findOne).toHaveBeenCalledWith({
      where: { email },
      raw: true,
    });
    expect(db.User.findOne).toHaveBeenCalledTimes(1);
  });
});
