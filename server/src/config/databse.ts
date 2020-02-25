import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

export const database = new Sequelize({
    database: process.env.DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    dialect: "postgres"
});