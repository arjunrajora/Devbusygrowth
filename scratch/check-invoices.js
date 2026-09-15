const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const envText = fs.readFileSync(path.join(__dirname, '../.env'), 'utf8');
const match = envText.match(/MONGODB_URI=(.*)/);
const uri = match ? match[1].trim() : null;

async function check() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    const invoices = await db.collection('invoices').find().toArray();
    console.log(JSON.stringify(invoices, null, 2));
  } finally {
    await client.close();
  }
}
check();
