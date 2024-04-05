const { MongoClient, ServerApiVersion } = require("mongodb");

class MongoClientConnector {
    static getClient() {
        const username = process.env.username;
        const password = process.env.password;
        const host = process.env.host;
        const uri = `mongodb+srv://${username}:${password}@${host}?retryWrites=true&w=majority`;
        let client = new MongoClient(uri, {
            serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
            },
            });

        return client;
    }
}

module.exports = MongoClientConnector