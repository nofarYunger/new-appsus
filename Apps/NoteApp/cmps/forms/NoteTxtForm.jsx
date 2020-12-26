export function NoteTxtForm({ note, submit, callback }) {
    var { txt } = note.info
    return (
        <form onSubmit={(ev) => submit(ev)}>
            <textarea name="info.txt" type="text" value={txt} placeholder="Note..." onChange={(ev) => callback(ev)}></textarea>
            <button type="submit">submit</button>
        </ form >

    )
}
