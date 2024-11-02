import { pool } from "../database/connection.database.js";

const create = async ({ email, password, username }) => {
    const query = {
        text: `
                INSERT INTO USERS (email, password, username)
                VALUES (?, ?, ?)
            `,
        values: [email, password, username]
    };
    const [result] = await pool.query(query.text, query.values);
    const [rows] = await pool.query('SELECT * FROM USERS WHERE uid = ?', [result.insertId]);
    console.log(rows);
    return rows[0];
};

const findOneByEmail = async (email) => {
    const query = {
        text: `
                SELECT * FROM USERS
                WHERE email = ?
            `,
        values: [email]
    };
    const [rows] = await pool.query(query.text, query.values);
    return rows.length > 0 ? rows[0] : null;
};

export const UserModel = {
    create,
    findOneByEmail,
};
