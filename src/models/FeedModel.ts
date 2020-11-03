import { Model, Sequelize, Optional } from "sequelize";
import { GroupModelTypes } from "@src/vo/group/models/GroupModel";
import { SignUpTypes } from "@src/vo/group/controllers/Group";

interface UserCreationAttributes
    extends Optional<SignUpTypes.SignUpBody, "id"> {}
class FeedModel
    extends Model<SignUpTypes.SignUpBody, UserCreationAttributes>
    implements SignUpTypes.SignUpBody {
    public id!: number;
    public name!: string;
    public email!: string;
    public pwd!: string;
    public grade!: number;
    public school!: string;
    public stdNum!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    static initiate(connection: Sequelize): Model {
        const opt: UserModelTypes.IBaseUserTableOptions = {
            sequelize: connection,
            tableName: "User"
        };
        return FeedModel.init(UserModelTypes.attr, opt);
    }
    // static createUser(value: SignUpTypes.SignUpPostBody) {
    //     return UserModel.create(value);
    // }
}

export default FeedModel;
