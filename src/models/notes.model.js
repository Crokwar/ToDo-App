import { pool } from '../database/connection.database.js';

const findAll = async() => {
    const query ={
        text: `SELECT * FROM NOTES`
    }
    const [rows] = await pool.query(query.text);
    return rows.length > 0 ? rows[0] : null;

};

const create = async({title, description, user_id, tags, due_date=null, image_url=null}) => {
    /*console.log('================================================================================================')
    console.log(title, description, user_id,tags, due_date, image_url);
    console.log('================================================================================================')*/

    const query = {
        text: `
            INSERT INTO NOTES (title, description, created_at, user_id, tags, due_date, image_url)
            VALUES (?, ?, NOW(), ?, ?, ?, ?)
        `,
        values: [title, description, user_id, tags, due_date, image_url]
    }

    const addNote = await pool.query(query.text, query.values)
    return addNote[0]
};

const eliminate = async({id}) => {
    const query = {
        text: `
            DELETE FROM NOTES WHERE ID = ?
        `,
        values: [id]
    }

    const deleteNote = await pool.query(query.text, query.values);
    return deleteNote[0]
};

const update = async({id, title, description, tags, due_date=null, image_url=null}) => {
    const query = {
        text: `
            UPDATE NOTES SET title = ?, description = ?, tags = ?, due_date = ?, image_url = ? 
            WHERE id = ?
        `,
        values: [title, description, tags, due_date, image_url, id]
    }

    const updateNote = await pool.query(query.text, query.values);
    return updateNote[0] 
};




export const notesModel = {
    create,
    eliminate,
    update,
    findAll,
}

