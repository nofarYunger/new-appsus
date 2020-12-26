const { Link } = ReactRouterDOM;

export class BookPreview extends React.Component {

    getPrice = () => {
        const book = this.props.book
        if (!book.listPrice) return `₪${book.price}`
        const curr = book.listPrice.currencyCode
        switch (curr) {
            case 'EUR':
                return `${book.listPrice.amount}€`;
            case 'ILS':
                return `₪${book.listPrice.amount}`;
            case 'USD':
                return `${book.listPrice.amount}$`;
            default: return `₪${book.listPrice.amount}`
                break;
        }

    }

    render() {
        const book = this.props.book
        return (<Link to={`/book/info/${book.id}`}>
            <div className="book-card">
                <img src={book.thumbnail} alt="" />
                <h3>{book.title}</h3>
                <p>{this.getPrice()}</p>

            </div>
        </Link>)
    }
}




