import { Kafka } from "kafkajs";
import DBManager from "@src/models/DBManager";

class KafkaManager extends DBManager {
    protected connection: Kafka | undefined;

    constructor() {
        super();
        this.connection = new Kafka({
            clientId: "my-app",
            brokers: ["127.0.0.1:9095", "127.0.0.1:9096", "127.0.0.1:9097"]
        });
    }

    getConnection(): Kafka | undefined {
        return this.connection;
    }
    endConnection(): void {}
}

export default KafkaManager;
