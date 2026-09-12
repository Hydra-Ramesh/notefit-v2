import Note from "../models/note.model.js";

class NoteRepository {
    async create(noteData) {
        return await Note.create(noteData);
    }
    
    async findAll() {
        return await Note.find();
    }
    
    async findById(noteId) {
        return await Note.findById(noteId);
    }
    
    async findByUserId(userId) {
        return await Note.find({ userId });
    }
    
    async update(noteId, updateData) {
        return await Note.findByIdAndUpdate(noteId, updateData, { new: true });
    }
    
    async delete(noteId) {
        return await Note.findByIdAndDelete(noteId);
    }
}

export default new NoteRepository();

