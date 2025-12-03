const { pool } = require('./connection');

async function createUser({
    userNickName,
    userPassword,
    userName,
    userSurname,
    userNID,
    userEmail,
    userPhone,
    userUUID,
    userGroup,
}) {
    const [resultSets] = await pool.query(
        'CALL mp_CreateUser(?,?,?,?,?,?,?,?,?)',
        [
            userNickName,
            userPassword,
            userName,
            userSurname,
            userNID,
            userEmail,
            userPhone,
            userUUID,
            userGroup,
        ]
    );

    return resultSets[0] || resultSets;
}

async function updateUser({
    pUserUUID,
    pUserUpdateId,
    pNickName,
    pName,
    pSurname,
    pNID,
    pEmail,
    pPhone,
    pGroupName,
}) {
    const [resultSets] = await pool.query(
        'CALL mp_UpdateUser(?,?,?,?,?,?,?,?,?)',
        [
            pUserUUID,
            pUserUpdateId,
            pNickName,
            pName,
            pSurname,
            pNID,
            pEmail,
            pPhone,
            pGroupName,
        ]
    );

    return resultSets[0] || resultSets;
}

async function deleteUser({ userUUID, deleteUserId }) {
    const [resultSets] = await pool.query(
        'CALL mp_DeleteUser(?,?)',
        [userUUID, deleteUserId]
    );

    return resultSets[0] || resultSets;
}

async function readUser({ userUUID, readUserId }) {
    const [resultSets] = await pool.query(
        'CALL mp_ReadUser(?,?)',
        [userUUID, readUserId]
    );

    return resultSets[0] || resultSets;
}

async function readAllUsers({ userUUID }) {
    const [resultSets] = await pool.query(
        'CALL mp_ReadAllUsers(?)',
        [userUUID]
    );

    return resultSets[0] || resultSets;
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    readUser,
    readAllUsers,
};
