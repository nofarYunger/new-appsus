export function NoteImgForm({ note, submit, callback }) {
    const { title, url } = note.info
    return (
        <form onSubmit={(ev) => submit(ev)}>
            <input name="info.title" type="text" placeholder="Note..." value={title} onChange={(ev) => callback(ev)} ></input>
            <input name="info.url" type="text" placeholder="Note..." value={url} onChange={(ev) => callback(ev)} ></input>
            <button type="submit">submit</button>
        </form>

    )
}