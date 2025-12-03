const { pool } = require('./connection');

async function createGroup({ groupName, userUUID }) {
    const [resultSets] = await pool.query(
        'CALL mp_CreateGroup(?,?)',
        [groupName, userUUID]
    );
    return resultSets[0] || resultSets;
}

async function updateGroup({ groupId, userUUID, newGroupName }) {
    const [resultSets] = await pool.query(
        'CALL mp_UpdateGroup(?,?,?)',
        [groupId, userUUID, newGroupName]
    );
    return resultSets[0] || resultSets;
}

async function deleteGroup({ groupId, userUUID }) {
    const [resultSets] = await pool.query(
        'CALL mp_DeleteGoup(?,?)',
        [groupId, userUUID]
    );
    return resultSets[0] || resultSets;
}

async function readGroups({ userUUID }) {
    const [resultSets] = await pool.query(
        'CALL mp_ReadGroups(?)',
        [userUUID]
    );
    return resultSets[0] || resultSets;
}

module.exports = {
    createGroup,
    updateGroup,
    deleteGroup,
    readGroups,
};
