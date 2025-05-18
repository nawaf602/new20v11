const { MongoClient } = require('mongodb');

async function testConnection() {
  const uri = 'mongodb+srv://nawafmalqarni:A551828602z@cluster0.6xzkyva.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const databasesList = await client.db().admin().listDatabases();
    console.log('✅ تم الاتصال بنجاح! قواعد البيانات المتوفرة:');
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
  } catch (err) {
    console.error('❌ خطأ في الاتصال بقاعدة البيانات:', err.message);
  } finally {
    await client.close();
  }
}

testConnection();
