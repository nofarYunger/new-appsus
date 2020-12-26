import { NoteTxt } from '../../NoteApp/cmps//NoteTxt.jsx'
import { NoteImg } from '../../NoteApp/cmps/NoteImg.jsx'
import { NoteTodos } from '../../NoteApp/cmps/NoteTodos.jsx'
import { NoteBar } from '../../NoteApp/cmps/NoteBar.jsx'
import { NoteVideo } from '../../NoteApp/cmps/NoteVideo.jsx'

export function NotePreview({ note, onRemove }) {
    var currView = note.type
    var bColor = note.style.backgroundColor
    const DynamicCmp = () => {
        switch (currView) {
            case 'NoteText': return <NoteTxt note={note} />
            case 'NoteImg': return <NoteImg note={note} />
            case 'NoteTodos': return <NoteTodos note={note} />
            case 'NoteVideo': return <NoteVideo note={note} />
        }


    }
    return (
        <div className="NotePreview card" style={{ backgroundColor: bColor }} >
            <NoteBar note={note} onRemove={onRemove} />
            <DynamicCmp />
        </div >
    )
}