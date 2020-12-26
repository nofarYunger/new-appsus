import { EventBusService } from "../../../services/EventBusService.js"


export class NoteAdd extends React.Component {
    state = {
        note: { type: "NoteText", info: {} },
        currView: 'NoteText'
    }

    // 
    onSubmit = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        const { onAdd } = this.props
        onAdd(this.state.note)
        this.refForm.current.reset()
        this.setState({
            note: {
                type: "NoteText",
                info: {},
            },
            currView: "NoteText",
            isEdit: false

        });

    }
    onReset = () => {
        this.refForm.current.reset()
        this.setState({
            note: {
                type: "NoteText", info: {},
            },
            currView: "NoteText", isEdit: false
        });

    }
    componentDidMount() {
        this.unsubscribe = EventBusService.on('edit', (note) => {
            if (!note) return
            console.log('edit');
            this.setState({ note, currView: note.type, isEdit: true })
        });
    }

    componentDidUnMount() {
        this.unsubscribe()
    }


    onInputChange = (ev) => {
        ev.preventDefault()
        var value = ev.target.value;
        var name = ev.target.name
        console.log('name:', name);
        console.log('val:', value);
        const noteCopy = { ...this.state.note };
        if (name.includes('Todo')) {
            var id = ev.target.id
            name = name.slice(4, name.length)
            var edits = noteCopy.info
            edits = edits.todos
            var toEdit = edits.find(todo => todo.id === name)
            toEdit.txt = value
            edits[id] = toEdit
            noteCopy.info = edits
        }
        else {
            noteCopy.info[name] = value
        }
        this.setState({
            note: noteCopy
        });
        console.log(this.state);
    }
    onChangeForm = (ev) => {
        ev.preventDefault()
        var value = ev.target.value;
        var noteCopy = { ...this.state.note };
        var viewCopy = { ...this.state.currView };
        viewCopy = value
        noteCopy.type = value
        this.setState({
            currView: viewCopy,
            note: noteCopy
        });
    }

    refForm = React.createRef();


    render() {
        var note = this.state.note
        const { currView } = this.state
        const { isEdit } = this.state
        console.log(this.state);
        return (
            <section className="NoteAdd">

                <form onSubmit={this.onSubmit} ref={this.refForm}>
                    <a className="close-btn" onClick={this.onReset}>x</a>
                    <select className="currView" name="currView" onChange={(ev) => { this.onChangeForm(ev) }}>
                        <option selected={currView === "NoteText" && "selected"} value="NoteText">Note</option>
                        <option selected={currView === "NoteImg" && "selected"} value="NoteImg">Img</option>
                        <option selected={currView === "NoteTodos" && "selected"} value="NoteTodos">Todos</option>
                        <option selected={currView === "NoteVideo" && "selected"} value="NoteVideo">Video</option>
                    </select>
                    <DynamicCmp isEdit={isEdit} currView={currView} note={note.info} onInputChange={(ev) => this.onInputChange(ev)} />
                    <button type="submit">{(this.state.note.id) ? <i className="fas fa-edit"></i> : <i className="fas fa-plus"></i>}</button>

                </form>

            </section>)
    }
}




function DynamicCmp({ onInputChange, note, currView, isEdit }) {
    console.log("note", note);
    var currView = currView
    switch (currView) {
        case 'NoteText': return <NoteTxtForm isEdit={isEdit} note={note} onInputChange={onInputChange} />
        case 'NoteImg': return <NoteImgForm isEdit={isEdit} note={note} onInputChange={onInputChange} />
        case 'NoteTodos': return <NoteTodosForm isEdit={isEdit} note={note} onInputChange={onInputChange} />
        case 'NoteVideo': return <NoteVideoForm isEdit={isEdit} note={note} onInputChange={onInputChange} />
    }
}

function NoteImgForm({ note, onInputChange, isEdit }) {
    return (
        <React.Fragment>
            <input name="title" value={isEdit ? note.title : undefined} type="text" placeholder="Title..." onChange={(ev) => onInputChange(ev)} ></input>
            <input name="url" value={isEdit ? note.url : undefined} type="text" placeholder="Url..." onChange={(ev) => onInputChange(ev)} ></input>
        </React.Fragment>

    )
}
function NoteVideoForm({ note, onInputChange, isEdit }) {
    return (
        <React.Fragment>
            <input name="title" value={isEdit ? note.title : undefined} type="text" placeholder="Title..." onChange={(ev) => onInputChange(ev)} ></input>
            <input name="url" value={isEdit ? note.url : undefined} type="text" placeholder="Url..." onChange={(ev) => onInputChange(ev)} ></input>
        </React.Fragment>

    )
}
function NoteTodosForm({ note, onInputChange, isEdit }) {
    console.log(note);
    var todos = note.todos
    if (!todos) todos = note
    return (
        <React.Fragment>
            {isEdit && todos.map((todo, idx) => {
                return (<input key={todo.id} id={idx} name={'Todo' + todo.id} value={isEdit ? todo.txt : undefined}
                    type="text" placeholder="Todo..." onChange={(ev) => onInputChange(ev)} ></input>)
            })}
            {/* <input name="label" value={isEdit ? note.label : undefined} type="text" placeholder="Label..." onChange={(ev) => onInputChange(ev)} ></input> */}
            < input name="todos" type="text" placeholder="Todo..." onChange={(ev) => onInputChange(ev)} ></input>
        </React.Fragment >
    )
}

function NoteTxtForm({ note, onInputChange, isEdit }) {
    return (
        <React.Fragment>
            <textarea className="addTxtArea" name="txt" value={isEdit ? note.txt : undefined} type="text" placeholder="text..." onInput={(ev) => onInputChange(ev)}></textarea>
        </React.Fragment>
    )
}
