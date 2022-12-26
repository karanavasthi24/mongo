const { MongoClient } = require('mongodb');

class Database {
  
    constructor() {
        this.uri = "mongodb+srv://karanavasthi24:ideapad@cluster0.tphxibv.mongodb.net/?retryWrites=true&w=majority";
        if (!Database.instance) {
        this.client = new MongoClient(this.uri);
        this.connectPromise = this.client.connect()
            .then(() => console.log('Connected to MongoDB'))
            .catch(error => console.error(error));
        Database.instance = this;
        }
        return Database.instance;
  }

    async getCollection(collectionName) {
        try{
            await this.connectPromise;
            return this.client.db(process.env.MONGO_DB).collection(collectionName);
        }catch(err){
            console.error(err);
            return null;
        }
    }
}

module.exports = new Database();
