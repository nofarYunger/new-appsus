import { EventBusService } from "../../../services/EventBusService.js";
export class NoteFilter extends React.Component {
    state = {
        filterBy: { type: '', txt: '' }
    }

    handleChange = (ev) => {

        const filterBy = { ...this.state.filterBy }
        filterBy[ev.target.name] = ev.target.value;
        this.setState({ filterBy }, EventBusService.emit('filterBy', filterBy))
    };

    render() {
        return <div className="filter"><input name="txt" type="text" placeholder="Search" onChange={this.handleChange} />
            <select name="type" onChange={this.handleChange}>
                <option value=''>All</option>
                <option value='NoteImg'>Img</option>
                <option value='NoteText'>Text</option>
                <option value='NoteTodos'>Todos</option>
                <option value='NoteVideo'>Video</option>
            </select></div>
    }
}