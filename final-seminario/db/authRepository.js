const { pool } = require('./connection');

async function findUserByCredentials(nickname, password) {
    try {
        const [resultSets] = await pool.query(
            'CALL mp_GetUserByCredentials(?,?)',
            [nickname, password]
        );
        return resultSets[0] || null;
    } catch (err) {
        console.error('🔥 Error en findUserByCredentials:', err);
        throw err;
    }
}

module.exports = { findUserByCredentials };
