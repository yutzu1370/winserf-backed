const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function createTodolistTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ todos 資料表已確認存在');
  } catch (err) {
    console.error('❌ 建立 todos 資料表失敗:', err);
  } finally {
    await pool.end();
  }
}

if (require.main === module) {
  createTodolistTable();
}

module.exports = createTodolistTable;
