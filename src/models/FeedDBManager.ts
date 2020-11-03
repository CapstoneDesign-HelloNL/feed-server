import { Sequelize } from "sequelize";
import LogService from "@src/utils/LogService";
import DBManager from "@src/models/DBManager";

class FeedDBManager extends DBManager {
    constructor() {
        super();
        this.connection = new Sequelize(
            process.env.DATABASE || "postgres",
            process.env.DB_USERNAME || "postgres",
            process.env.DB_PASSWORD,
            {
                host: process.env.DB_HOST,
                dialect: "postgres",
                logging: LogService.getInstance().info.bind(
                    LogService.getLogger()
                )
            }
        );
        async () => await this.checkConnection();
    }

    async checkConnection(): Promise<void> {
        await this.connection
            .authenticate()
            .then(() =>
                LogService.getInstance().info(
                    "Connection has been established successfully."
                )
            )
            .catch((err) =>
                LogService.getInstance().error(
                    `Unable to connect to the database: ${err}`
                )
            );
    }
    getConnection(): Sequelize {
        return this.connection;
    }
    async endConnection(): Promise<void> {
        await this.connection
            .close()
            .then(() => LogService.getInstance().info("Connection end"))
            .catch((err) => LogService.getInstance().error(err));
    }
}

export default FeedDBManager;
