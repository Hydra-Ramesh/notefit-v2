import noteRepository from '../repositories/note.repository.js';

class NoteService {
    async createNote(noteData) {
        return await noteRepository.create(noteData);
    }

    async getAllNotes() {
        return await noteRepository.findAll();
    }

    async getNoteById(noteId) {
        return await noteRepository.findById(noteId);
    }

    async getNotesByUser(userId) {
        return await noteRepository.findByUserId(userId);
    }

    async updateNote(noteId, updateData) {
        return await noteRepository.update(noteId, updateData);
    }

    async deleteNote(noteId) {
        return await noteRepository.delete(noteId);
    }
}

export default new NoteService();

