import env from "@src/utils/dotenv";
import jwt from "jsonwebtoken";
import LogService from "@src/utils/LogService";

const logger = LogService.getInstance();
env.chooseEnv();
class Webtoken {
    constructor() {}

    static createToken(payload, options): string {
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, options);
        return token;
    }

    static verifyToken(token): object | null {
        let validToken: object;
        try {
            validToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        } catch (err) {
            logger.error(err);
            return null;
        }
        return validToken;
    }
}
export default Webtoken;