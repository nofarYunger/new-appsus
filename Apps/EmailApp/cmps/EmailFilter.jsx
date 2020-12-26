import { EventBusService } from "../../../services/EventBusService.js";

export class EmailFilter extends React.Component {
    state = {
        key: ''
    }


    handleChange = (ev) => {
        const { value } = ev.target
        this.setState({ key: value })
        EventBusService.emit('filterBy', value)
        // this.props.callback(value)
    };
    render() {
        const searchIcon = <i className="fas fa-search"></i>
        return (

            <div className="filter" >
                <input type="text" placeholder="search for email, subject orr name" name="key" value={this.state.key} onChange={this.handleChange} />{searchIcon}
            </div>

        );
    }
}


