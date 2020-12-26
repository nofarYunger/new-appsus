export function NoteTodosForm({ note, submit, callback }) {
    const { label } = note.info
    const { txt } = note.info.todos
    return (
        <form onSubmit={(ev) => submit(ev)}>
            <input name="info.label" type="text" placeholder="Note..." value={label} onChange={(ev) => callback(ev)} ></input>
            <input name="info.todos" type="text" placeholder="Note..." value={txt} onChange={(ev) => callback(ev)} ></input>
            <button type="submit">submit</button>
        </form>

    )
}