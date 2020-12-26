import { EventBusService } from "../../../services/EventBusService.js";

export class BookFilter extends React.Component {
    state = {
        fromPrice: 0, toPrice: 1000, title: ''
    };

    handleChange = (ev) => {
        const callback = () => {
            this.props.setFilter(this.state);
        };
        const value = ev.target.type === 'number' ? +ev.target.value : ev.target.value;
        const field = ev.target.name;
        this.setState({ [field]: value }, EventBusService.emit('filterBy', this.state))

    };


    render() {
        return <section className="BookFilter">

            <form onSubmit={ev => ev.preventDefault()}>

                <label htmlFor="title"></label>
                <input className="filter" type="text" name="title"
                    placeholder="Title" value={this.state.title}
                    onChange={this.handleChange} />
                <label htmlFor="fromPrice"></label>
                <input type="number" name="fromPrice"
                    placeholder="From" value={this.state.fromPrice}
                    onChange={this.handleChange} />
                <label htmlFor="toPrice"></label>
                <input type="number" name="toprice"
                    placeholder="To" value={this.state.toPrice}
                    onChange={this.handleChange} />
            </form>
        </section>;
    }

}