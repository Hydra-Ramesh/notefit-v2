import noteService from '../services/note.service.js';

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ status: 'error', message: 'Title and content are required' });
        }
        const note = await noteService.createNote({ title, content, userId: req.user._id });
        res.status(201).json({ status: 'success', data: note });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const getNotes = async (req, res) => {
    try {
        const notes = await noteService.getNotesByUser(req.user._id);
        res.status(200).json({ status: 'success', data: notes });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const getNoteById = async (req, res) => {
    try {
        const note = await noteService.getNoteById(req.params.id);
        if (!note) {
            return res.status(404).json({ status: 'error', message: 'Note not found' });
        }
        res.status(200).json({ status: 'success', data: note });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const updateNote = async (req, res) => {
    try {
        const updatedNote = await noteService.updateNote(req.params.id, req.body);
        if (!updatedNote) {
            return res.status(404).json({ status: 'error', message: 'Note not found' });
        }
        res.status(200).json({ status: 'success', data: updatedNote });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const deletedNote = await noteService.deleteNote(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({ status: 'error', message: 'Note not found' });
        }
        res.status(200).json({ status: 'success', message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

