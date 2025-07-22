// services/transactionService.js
const pool = require('../models/db');

async function performTransaction(userName) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [res1] = await conn.execute(
      'INSERT INTO users (name) VALUES (?)',
      [userName]
    );
    const userId = res1.insertId;

    await conn.execute(
      'INSERT INTO logs (message) VALUES (?)',
      [`Created user ${userId}`]
    );

    await conn.commit();
    return userId;

  } catch (err) {
    await conn.rollback();
    throw err;

  } finally {
    conn.release();
  }
}

module.exports = { performTransaction };
