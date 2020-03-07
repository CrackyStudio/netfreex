import * as dotenv from "dotenv";
import { Model, DataTypes } from "sequelize";
import { database } from "../config/databse";
import { hashSync, compareSync } from "bcryptjs";

dotenv.config();

export interface UserInterface {
    nickname: string;
    secret: string;
    password: string;
    role: string;
}

export class User extends Model {
    public id!: number;
    public nickname!: string;
    public secret!: string;
    public password: string;
    public role: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    hashPassword() {
        this.password = hashSync(this.password, 8);
    }
    
    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return compareSync(unencryptedPassword, this.password);
    }
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
        },
        secret: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            unique: true
        },
        password: {
            type: new DataTypes.STRING(128),
        },
        role: {
            type: new DataTypes.STRING(128),
            allowNull: false
        }
    },
    {
        tableName: "users",
        sequelize: database,
        indexes: [
            {
              unique: true,
              fields: ["nickname", "secret"]
            }
        ],
    }
);

if (process.env.DROP_TABLES === "true") {
    User.sync({ force: true }).then(() => console.log("User table cleared"));
} else {
    User.sync({ force: false }).then(() => console.log("User table loaded"));
}
