
export function NoteTodos({ note }) {
    let todos = note.info.todos
    let todosmap = todos.map(todo => <li key={todo.id} >{todo.txt} </li>)
    return (<div className="NoteTodos flex-col">
        <div>{note.info.label}</div>
        <ul className="flex">{todosmap}</ul>
        <i className="fas fa-list"></i>
    </div>)
}


