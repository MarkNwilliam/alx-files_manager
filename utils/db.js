import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';
    this.url = `mongodb://${this.host}:${this.port}`;

    this.client = new MongoClient(this.url, { useUnifiedTopology: true });

    this.client.connect((err) => {
      if (err) {
        this.db = false;
      } else {
        this.db = this.client.db(this.database);
      }
    });
  }

  isAlive() {
    return !!this.db;
  }

  async nbUsers() {
    const collection = this.db.collection('users');
    return collection.countDocuments();
  }

  async nbFiles() {
    const collection = this.db.collection('files');
    return collection.countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
