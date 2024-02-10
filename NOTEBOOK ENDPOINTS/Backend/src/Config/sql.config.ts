import mssql from 'mssql'

export const sqlConfig = {
  user: "sa",
  password: "37853801",
  database: "NOTES",
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

    let Note = "CREATE TABLE Note(Note_id VARCHAR(255), Title VARCHAR(255), Content VARCHAR(1500), Created_At VARCHAR(100))";
    let result = (await pool.request().query(Note)).rowsAffected;
    

    console.log(result);
  } else {
    console.log("not connected");
  }
};

connect();
