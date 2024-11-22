import { notesModel } from '../models/notes.model.js';

const getNotes = async (req, res) => {
    try {
        const notes = await notesModel.findAll();
        return res.status(200).json({ msg: notes});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
};

const getNote = async (req, res) => {

};

const createNote = async (req, res) => {
    const { title, description, tags, due_date, image_url} = req.body;
    const user_id = req.user.id;
    
    try {
        const createdNote = await notesModel.create({title, description, user_id, tags, due_date, image_url});
        return res.status(201).json({msg: 'Note created successfully'})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
};

const deleteNote = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedNote = await notesModel.eliminate({id});
        return res.status(204).json({msg: 'Note deleted successfully'})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
};

const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, description, tags, due_date, image_url } = req.body;

    try {

        const updatedNote = await notesModel.update({id, title, description, tags, due_date, image_url})
        return res.status(204).json({msg: updatedNote})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
};

export const notesController = {
    getNotes,
    getNote,
    createNote,
    deleteNote,
    updateNote
}