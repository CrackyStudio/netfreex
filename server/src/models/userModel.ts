import { Model, DataTypes } from "sequelize";
import { database } from "../config/databse";
import * as dotenv from "dotenv";

dotenv.config();

export interface UserInterface {
    nickname: string;
}

export class User extends Model {
    public id!: number;
    public nickname!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nickname: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            unique: true
        }
    },
    {
        tableName: "users",
        sequelize: database,
        indexes: [
            {
              unique: true,
              fields: ["nickname"]
            }
        ],
    }
);

if (process.env.DROP_TABLES === "true") {
    User.sync({ force: true }).then(() => {
        console.log("User table created")
        User.create({nickname: "Cracky"});
    });
} else {
    User.sync({ force: false }).then(() => console.log("User table loaded"));
}
