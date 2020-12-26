import { NoteBar } from './NoteBar.jsx'
export function NoteTxt({ note }) {
    return (<section>
        <div className="NoteTxt flex-col">
            <p suppressContentEditableWarning="true" contentEditable> {note.info.txt}</p>
            <i className="fas fa-file-alt"></i>
        </div>

    </section>
    )
}
