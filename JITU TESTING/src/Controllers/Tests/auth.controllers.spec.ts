import bcrypt from "bcrypt";
import mssql from "mssql";
// import { User } from "../../Controllers/auth.controllers";
import {
  registerUser,
  deleteUser,
  getUser,
  updateUser,
} from "../../Controllers/auth.controllers";
import { sqlConfig } from "../../Config/config";

describe("User Registration", () => {
  let res: any;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it("successfully registers a user", async () => {
    const req = {
      body: {
        First_Name: "admin",
        Last_name: "admin",
        Email: "admin.admin@thejitu.com",
        Cohort_Number: "1",
        Password: "12345",
      },
    };

    jest
      .spyOn(bcrypt, "hash")
      .mockResolvedValueOnce("qwetjdPwdkjshghgksjgkj" as never);

    // Mocking mssql connection and execute
    const mockedExecute = jest
      .fn()
      .mockResolvedValueOnce({ rowsAffected: [1] });
    const mockedRequest = {
      input: jest.fn().mockReturnThis(),
      execute: mockedExecute,
    };
    const mockedPool = {
      request: jest.fn().mockReturnValue(mockedRequest),
    };

    // Mocking MSSQL connection to resolve with the mocked pool
    jest.spyOn(mssql, "connect").mockResolvedValueOnce(mockedPool as never);

    await registerUser(req as any, res);

    expect(res.json).toHaveBeenCalledWith({
      message: "User registered successfully",
    });
  });

  it("gets a user", async () => {
    const mockedresult = [
      {
        User_id: "7hhsad-6e5cnbsnv-4hgdb78-wdb96hg5d-8a2w6469bi89",
        Fist_Name: "admin",
        Last_Name: "admin",
        Email: "admin.admin@thejitu.com",
        Cohort_Number: "22",
        Password: "test112",
      },
    ];
    const req = {
      params: {
        User_id: "7hhsad-6e5cnbsnv-4hgdb78-wdb96hg5d-8a2w6469bi89",
      },
    };

    // Mocking Connection.execute
    (mssql.connect as jest.Mock).mockResolvedValueOnce({
      request: jest.fn().mockResolvedValueOnce({
        recordset: mockedresult[0],
      }),
    });

    await getUser(req as any, res);

    expect(res.json).toHaveBeenCalledWith({
      user: mockedresult[0],
    });
  });

  it("Successfully updates a user", async () => {
    const req = {
      body: {
        First_Name: "admin",
        Last_Name: "admin",
        Email: "admin.admin.com",
        Cohort_Number: "22",
        Password: "test112",
      },
    };
    const mockedInput = jest.fn().mockReturnThis();
    const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });

    const mockedRequest = {
      input: mockedInput,
      execute: mockedExecute,
    };
    const mockedPool = {
      request: jest.fn().mockReturnValue(mockedRequest),
    };

    // Mocking MSSQL connection to resolve with the mocked pool
    jest.spyOn(mssql, "connect").mockResolvedValueOnce(mockedPool as never);

    await updateUser(req as any, res);

    expect(res.status(200).json).toHaveBeenCalledWith({
      message: "Details updated successfully",
    });
  });

  it("successfully deletes a user", async () => {
    const req = { body: {} };
    const mockedInput = jest.fn().mockReturnThis();
    const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });

    const mockedRequest = {
      input: mockedInput,
      execute: mockedExecute,
    };

    const mockedPool = {
      request: jest.fn().mockReturnValue(mockedRequest),
    };

    // Mocking MSSQL connection to resolve with the mocked pool
    jest.spyOn(mssql, "connect").mockResolvedValueOnce(mockedPool as never);

    await deleteUser(req as any, res);

    expect(res.status(200).json).toHaveBeenCalledWith({
      message: "User deleted successfully",
    });
  });
});
