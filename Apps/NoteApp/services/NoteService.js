import { UtilService } from '../../../services/UtilService.js'
import { StorageService } from '../../../services/StorageService.js'

export const NoteService = {
    query,
    save,
    remove,
    getById
}
var gNotes;
const KEY = 'notesDB'
_createNotes()

function _createNotes() {
    gNotes = StorageService.load(KEY);
    if (!gNotes || !gNotes.length) {
        // Nothing in localStorage, use demo data
        gNotes = _getDemoNotes()
        _saveNotesToStorage();
    }
}
function save(note) {

    if (!note) return Promise.resolve()
    if (note.id) {
        return _update(note);
    } else {
        return _add(note);
    }
}

function _add(note) {

    const noteToAdd = {
        id: UtilService.makeId(),
        isPinned: false,
        style: {
            backgroundColor: "#f5f5689d"
        },
        ...note
    };

    gNotes = [noteToAdd, ...gNotes];
    _saveNotesToStorage();
    return Promise.resolve(noteToAdd);
}

function _update(note) {


    const noteToUpdate = {
        ...note
    };
    const notesCopy = [...gNotes];
    const noteIdx = notesCopy.findIndex(note => noteToUpdate.id === note.id);
    notesCopy[noteIdx] = noteToUpdate;
    gNotes = notesCopy;
    _saveNotesToStorage();
    return Promise.resolve(noteToUpdate);
}
function _saveNotesToStorage() { StorageService.save(KEY, gNotes) }

function remove(noteId) {
    gNotes = gNotes.filter(note => note.id !== noteId);
    _saveNotesToStorage();
    return Promise.resolve();
}

function getById(noteId) {
    const note = gNotes.find(note => note.id === noteId);
    return Promise.resolve(note);
}
function query() {
    return Promise.resolve(gNotes)
}

function _getDemoNotes() {
    const notes = [
        {
            id: UtilService.makeId(),
            type: "NoteText",
            isPinned: true,

            info: {
                txt: "Fullstack Me Baby!"

            },
            style: {
                backgroundColor: ""
            }
        },
        {
            id: UtilService.makeId(),
            type: "NoteImg",
            isPinned: true,
            info: {
                url: "https://s1.kikar.co.il/th/data/auto/nadm/tu/hmekxrx5__w643h448q95.jpg",
                title: "Me playing Mi"
            },
            style: {
                backgroundColor: ""
            }
        },
        {
            id: UtilService.makeId(),
            type: "NoteTodos",
            isPinned: true,
            info: {
                label: "How was it:",
                todos: [
                    { id: UtilService.makeId(), txt: "Do that", doneAt: null },
                    { id: UtilService.makeId(), txt: "Do this", doneAt: 187111111 }
                ]
            },
            style: {
                backgroundColor: ""
            }
        }

    ];
    return notes
}
