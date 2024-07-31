import { Client } from "pg";

const client = new Client({
  connectionString:
    "mongodb+srv://akkastic:akkastic80hasan@akkastic-store.othv893.mongodb.net/akkastic-store",
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

export default client;
