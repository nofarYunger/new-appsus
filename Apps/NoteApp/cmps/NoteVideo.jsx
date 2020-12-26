
export function NoteVideo({ note }) {
    var src = note.info.url
    return (<div className="flex-col NoteImg">
        <div >{note.info.title}</div>
        <iframe width="250" height="250" src={src} frameBorder="0" allow="encrypted-media" allowfullscreen>
        </iframe>
        <i class="fab fa-youtube"></i>

    </div>)
}