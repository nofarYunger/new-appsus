import { NotePreview } from './NotePreview.jsx'
export function NoteList({ notes, onRemove }) {

    return (<section className="NoteList container">
        <article className="note-list flex">
            {notes.map(note => {
                return <NotePreview key={note.id} note={note} onRemove={onRemove} />
            })}
        </article>  </section>)

}