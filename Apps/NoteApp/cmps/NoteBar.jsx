import { EventBusService } from '../../../services/EventBusService.js'

export class NoteBar extends React.Component {
    state = {
        note: this.props.note
    }
    refPin = React.createRef();

    handleChangeStyle = (ev) => {
        ev.preventDefault();//on input change

        const value = ev.target.value;

        if (!value) return
        var name = ev.target.name
        const noteCopy = { ...this.state.note };
        noteCopy.style[name] = value
        // like petCopy.name/power = 
        this.setState({ note: noteCopy })
        EventBusService.emit('change', noteCopy)

    }
    onCheck = () => {
        const noteCopy = { ...this.state.note };
        if (noteCopy.isPinned) {
            noteCopy.isPinned = false
            this.refPin.current.className = "fas fa-thumbtack red"
        }
        else {
            noteCopy.isPinned = true
            this.refPin.current.className = "fas fa-thumbtack"
        }
        this.setState({ note: noteCopy })
        EventBusService.emit('change', noteCopy)
    }
    onEdit = () => {
        const noteCopy = { ...this.state.note };
        EventBusService.emit('edit', noteCopy)
    }
    render() {

        const { id } = this.props.note;

        const { style } = this.props.note;
        const { onRemove } = this.props;
        return (<ul className="note-bar " >
            <li className="pin" onClick={() => this.onCheck()}><i className="fas fa-thumbtack" ref={this.refPin}></i></li>
            <li onClick={() => { onRemove(id) }}><i className="fas fa-trash"></i></li>
            <li> <input name="backgroundColor" onChange={(event) => this.handleChangeStyle(event)} value={style} className="color-pallete" type="color" list="presets" />
                <datalist id="presets">
                    <option value="#cccccc">Grey</option>
                    <option value="#dda0dd">White</option>
                    <option value="#6699cc">Blue</option>
                    <option value="#dd1f68de">Pink</option>
                    <option value="#a2ec9c">Green</option>
                    <option value="#f9f9a2">Yellow</option>
                </datalist><i className="fas fa-palette">
                </i>
            </li>
            <li onClick={() => { this.onEdit() }}><i className="fas fa-edit"></i></li>
            {/* <li ><i className="fas fa-check"></i></li> */}
        </ul >)
    }
}



