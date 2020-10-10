import { Model } from "sequelize";
import argon2 from "argon2";

import GroupDBManager from "@src/models/GroupDBManager";
import UserModel from "@src/models/UserModel";

import LogService from "@src/utils/LogService";

import { SignUpTypes } from "@src/vo/auth/controllers/Signup";

const logger = LogService.getInstance();

class SignupDao {
    static async find(email: string): Promise<Model | null | undefined> {
        const db = new GroupDBManager();
        UserModel.initiate(db.getConnection());
        let find: Model | null = null;
        try {
            find = await UserModel.findOne({
                where: {
                    email: email
                }
            });
        } catch (err) {
            logger.error(err);
            db.getConnection().close();
            return undefined;
        }
        db.getConnection().close();
        return find;
    }

    static async save(
        userData: SignUpTypes.SignUpPostBody
    ): Promise<UserModel | undefined> {
        const db = new GroupDBManager();
        UserModel.initiate(db.getConnection());
        if (process.env.NODE_ENV === "test")
            await UserModel.sync({ force: true });
        else await UserModel.sync();

        let newUser: UserModel | null = null;
        userData.pwd = await argon2.hash(userData.pwd);
        try {
            newUser = await UserModel.create(userData);
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        db.getConnection().close();
        return newUser;
    }
}

export default SignupDao;
