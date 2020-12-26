export class EmailSort extends React.Component {
    state = {
        sortBy: ''
    }

    handleChange = (value) => {
        this.setState({ key: value })
        this.props.onSort(value)
    };

    render() {
        return (

            <div className="EmailSort" >
                <h2>Sort mail by:</h2>
            
                <button className="btn-side" onClick={() => this.handleChange("unread")}><i className="fas fa-envelope-open-text"></i> Un read</button>
                <button className="btn-side" onClick={() => this.handleChange("date")}><i className="far fa-calendar-alt"></i> Date</button>
                <button className="btn-side" onClick={() => this.handleChange("importance")}> <i className="fas fa-star"></i>Importance</button>


            </div>
        );
    }
}

