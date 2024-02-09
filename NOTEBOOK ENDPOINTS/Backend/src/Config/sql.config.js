"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlConfig = void 0;
const mssql_1 = __importDefault(require("mssql"));
exports.sqlConfig = {
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
console.log(exports.sqlConfig);
let connect = () => __awaiter(void 0, void 0, void 0, function* () {
    let pool = yield mssql_1.default.connect(exports.sqlConfig);
    if (pool.connected) {
        console.log("connected");
        let Note = "CREATE TABLE Note(User_id VARCHAR(255), Title VARCHAR(255), Content(255), Created_At time datetime)";
        let result = (yield (yield pool.connect()).query(Note)).rowsAffected;
        console.log('result');
    }
    else {
        console.log("not connected");
    }
});
connect();
