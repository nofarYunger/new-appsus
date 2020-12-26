import { BooksService } from '../services/BookService.js'
const { Link } = ReactRouterDOM;

export class BookDetails extends React.Component {

    state = {
        book: null
    };

    componentDidMount() {
        console.log(this.props);
        const { bookId } = this.props.match.params;
        console.log(bookId);
        BooksService.getById(bookId).then(book => {
            this.setState({ book });
        });
    }




    getPriceClass = () => {
        const book = this.state.book
        if (book.listPrice.amount > 150) return 'red'
        else if (book.listPrice.amount < 20) return 'green'
    }


    bookPageCount = () => {
        const book = this.state.book
        if (book.pageCount > 500) return `Long reading`
        else if (book.pageCount > 200) return `Decent reading`
        else if (book.pageCount < 100) return `Light reading`
        else return book.pageCount
    }


    getPrice = () => {
        const book = this.state.book
        if (!book.listPrice) return `₪${book.price}`
        const curr = book.listPrice.currencyCode
        switch (curr) {
            case 'EUR':
                return `${book.listPrice.amount}€`;
            case 'ILS':
                return `₪${book.listPrice.amount}`;
            case 'USD':
                return `${book.listPrice.amount}$`;
            default:
                break;
        }

    }


    printReviews = () => {
        const book = this.state.book
        const reviews = book.reviews

        return reviews.map((review, idx) => {

            return <div className="review" key={idx}>
                <h3>{review.fullName}s review :</h3>
                <p> Rate:{review.rate}</p>
                <p> Read at: {review.readAt}</p>
                <p>{review.txt}</p>
            </div>
        })
    }



    render() {
        const book = this.state.book
        if (!book) return null
        return (
            <div className={`book-modal`}  >
                <div className="flex-book"> <img src={book.thumbnail} alt="" />
                    <div className="bookInfo"> <h1>{book.title}</h1>
                        <h2>{book.subtitle}</h2>
                        <h3>Authors:{book.authors}</h3>
                        <p>Published Date: {book.publishedDate}</p>
                        <p>pageCount: {book.pageCount} type: {this.bookPageCount()}</p>
                        <h3 className={this.getPriceClass()}> {this.getPrice()}</h3>
                        {book.listPrice.isOnSale && <img className={'sale-icon'} src="https://cdn4.iconfinder.com/data/icons/color-webshop/512/sale_shopping_online_sell-512.png" alt="" />}
                    </div>
                </div>

                {book.reviews && <h1>Reviews:</h1>}
                {book.reviews && this.printReviews()}
                <div className="details-btn">
                <Link to={`/book`}> <button className=" btn-book" ><i class="fas fa-times"></i></button></Link>
                <Link to={`/book/info/${book.id}/editReview`}><button className=" btn-book" >Edit Review</button></Link>
                </div>
            </div>
        );
    }
}