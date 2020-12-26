import { NoteAdd } from "./cmps/NoteAdd.jsx";
import { NoteList } from "./cmps/NoteList.jsx";
import { NoteService } from './services/NoteService.js'
import { EventBusService } from '../../services/EventBusService.js'

const { Link } = ReactRouterDOM;

export class NoteApp extends React.Component {
    state = {
        notes: '',
        filterBy: { type: '', txt: '' },
        editIsOn: false
    }
    componentDidMount() {
        this.loadNotes()
        this.unsubscribe = EventBusService.on('change', (note) => {
            if (!note) return
            NoteService.save(note)
                .then(() => this.loadNotes())
        });
        this.unsubscribeOnFiter = EventBusService.on('filterBy', (value) => {
            this.onSetFilter(value)
        });
    }

    onAdd = (note) => {
        NoteService.save(note)
            .then(() => this.loadNotes())

    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    loadNotes = () => {
        NoteService.query()
            .then(notes => this.setState({ notes }))

    }
    onRemoveNote = (noteId) => {
        NoteService.remove(noteId).then(() => {
            this.loadNotes()
        })
    }
    onSetFilter = (filterBy) => {
        this.setState({ filterBy });
    }
    onShowEdit = () => {
        this.setState({ editIsOn: true });
    }
    getNotesForDisplay = () => {
        const { filterBy, notes } = this.state;
        if (!notes) return null
        notes.sort(function (x, y) {
            return (x.isPinned === y.isPinned) ? 0 : x.isPinned ? -1 : 1;
        });
        const filterRegex = new RegExp(filterBy.txt, 'i');
        const filterType = filterBy.type
        if (!filterType) return notes.filter(note =>
            filterRegex.test(note.type) || filterRegex.test(note.info.txt) || filterRegex.test(note.info.label));
        return notes.filter(note => (filterRegex.test(note.type) && note.type === filterType));

    }



    render() {
        const { notes } = this.state
        const notesForDisplay = this.getNotesForDisplay();
        if (!notes) return <div>Loading...</div>
        return (
            <section className="NoteApp">
                <header>
                    <NoteAdd onAdd={this.onAdd} />
                </header >
                <NoteList notes={notesForDisplay} onRemove={this.onRemoveNote} />
            </section >

        );
    }
}