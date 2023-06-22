import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'mydb.db',
    location: 'default',
  },
  () => {
    console.log('Database opened successfully.');
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS blocked_items (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT);'
      );
    });
  },
  (error) => {
    console.error('Failed to open database:', error);
  }
);

export default db;
