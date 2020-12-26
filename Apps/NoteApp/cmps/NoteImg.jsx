
export function NoteImg({ note }) {
    var src = note.info.url
    return (<div className="flex-col NoteImg">
        <div >{note.info.title}</div>
        <img src={src} />
        <i className="fas fa-images"></i>
    </div>)
}