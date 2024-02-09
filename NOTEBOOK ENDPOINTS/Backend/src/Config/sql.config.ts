import mssql from "mssql";

export const sqlConfig = {
  user: "sa",
  password: "37853801",
  database: "Notebook",
  server: "DESKTOP-QO3AGRF",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};


console.log(sqlConfig);

let connect = async () => {
  let pool = await mssql.connect(sqlConfig);

  if (pool.connected) {
    console.log("connected");

    let Note =
      "CREATE TABLE Note(User_id VARCHAR(255), Title VARCHAR(255), Content(255), Created_At time datetime)";
    let result = (await (await pool.connect()).query(Note)).rowsAffected;
    

    console.log('result');
  } else {
    console.log("not connected");
  }
};

connect();
