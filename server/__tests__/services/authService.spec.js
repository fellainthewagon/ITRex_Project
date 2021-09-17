const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authService = require("../../src/components/auth/authService");
const userService = require("../../src/components/user/userService");
const UserDto = require("../../src/dtos/userDto");
const tokenService = require("../../src/components/token/tokenService");
const userStorage = require("../../src/components/repositories/userStorage");
const patientStorage = require("../../src/components/repositories/patientStorage");
const doctorStorage = require("../../src/components/repositories/doctorStorage");
const { DOCTOR_NO_EXIST } = require("../../src/constants");

/**
 * mocking funcs
 */
userStorage.create = jest.fn();
patientStorage.findOrCreate = jest.fn();
userService.checkCredential = jest.fn();
doctorStorage.getDoctorByUserId = jest.fn();
tokenService.generateToken = jest.fn();
bcrypt.hash = jest.fn();
jwt.sign = jest.fn();

/**
 * vars
 */
const registerData = { name: "mia", email: "mia@mail.ru", password: "123123" };
const reqBody = { email: "mia@mail.ru", password: "123123" };
const user = {
  id: "e7a0f1f0-0c59-11ec-acf4-3f4b5c85ffb3",
  email: "mia@mail.ru",
  password: "hashed ajhdi password",
  createdAt: "2021-09-03T01:54:41.000Z",
  updatedAt: "2021-09-03T01:54:41.000Z",
  role: "doctor",
};
const doctor = {
  id: 1,
  name: "John Cole",
  specialization: { specialization: "therapist" },
};
const token = { accessToken: "access token" };
const hashedPassword = "hashed ajhdi password";
const { email, password } = registerData;
const userDto = new UserDto(user);

beforeEach(() => jest.clearAllMocks());

async function catchBlockTest(method, fn, rootFn) {
  jest.spyOn(rootFn, method).mockImplementation(async () => {
    throw new Error("Some error");
  });
  await expect(fn()).rejects.toThrowError();
  rootFn[method].mockRestore();
}

/**
 * TEST
 */
describe("'AuthService' class", () => {
  it("'registration' method", async () => {
    bcrypt.hash.mockResolvedValue(hashedPassword);
    userStorage.create.mockResolvedValue(user);

    expect(await authService.registration(registerData)).toEqual({
      ...userDto,
    });
    expect(userStorage.create).toHaveBeenCalledWith(email, hashedPassword);
    expect(userStorage.create).toHaveBeenCalledTimes(1);
    expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
    expect(bcrypt.hash).toHaveBeenCalledTimes(1);
    expect(patientStorage.findOrCreate).toHaveBeenCalledWith(
      registerData,
      user.id
    );
    expect(patientStorage.findOrCreate).toHaveBeenCalledTimes(1);

    await catchBlockTest("create", authService.registration, userStorage);
  });

  it("'login' method, if credential is valid and user.role = 'therapist'", async () => {
    userService.checkCredential.mockResolvedValue(user);
    doctorStorage.getDoctorByUserId.mockResolvedValue(doctor);
    tokenService.generateToken.mockReturnValue(token);

    userDto.doctor_id = doctor.id;
    userDto.doctor_name = doctor.name;
    userDto.doctor_specialization = doctor.specialization.specialization;

    expect(await authService.login(reqBody)).toEqual({
      user: { ...userDto },
      token,
    });

    expect(userService.checkCredential).toHaveBeenCalledWith(reqBody);
    expect(userService.checkCredential).toHaveBeenCalledTimes(1);
    expect(tokenService.generateToken).toHaveBeenCalledWith({ ...userDto });
    expect(tokenService.generateToken).toHaveBeenCalledTimes(1);
    expect(doctorStorage.getDoctorByUserId).toHaveBeenCalledTimes(1);
    expect(doctorStorage.getDoctorByUserId).toHaveBeenCalledWith(user.id);

    await catchBlockTest("checkCredential", authService.login, userService);
  });

  it("'login' method, if credential is valid and user.role = 'therapist'", async () => {
    userService.checkCredential.mockResolvedValue(user);
    doctorStorage.getDoctorByUserId.mockResolvedValue(null);

    await expect(authService.login(reqBody)).rejects.toThrowError(
      DOCTOR_NO_EXIST
    );

    expect(userService.checkCredential).toHaveBeenCalledWith(reqBody);
    expect(userService.checkCredential).toHaveBeenCalledTimes(1);
    expect(doctorStorage.getDoctorByUserId).toHaveBeenCalledWith(user.id);
    expect(doctorStorage.getDoctorByUserId).toHaveBeenCalledTimes(1);
    expect(tokenService.generateToken).toHaveBeenCalledTimes(0);
  });

  it("'login' method, if credential is valid and user.role = 'patient'", async () => {
    userService.checkCredential.mockResolvedValue(user);
    tokenService.generateToken.mockReturnValue(token);

    user.role = "patient";
    const userDto = new UserDto(user);
    userDto.role = "patient";

    expect(await authService.login(reqBody)).toEqual({
      user: { ...userDto },
      token,
    });

    expect(userService.checkCredential).toHaveBeenCalledWith(reqBody);
    expect(userService.checkCredential).toHaveBeenCalledTimes(1);
    expect(tokenService.generateToken).toHaveBeenCalledWith({ ...userDto });
    expect(tokenService.generateToken).toHaveBeenCalledTimes(1);
    expect(doctorStorage.getDoctorByUserId).toHaveBeenCalledTimes(0);

    await catchBlockTest("checkCredential", authService.login, userService);
  });
});
