import { BooksService } from './services/BookService.js'
import { BookList } from './cmps/BookList.jsx'
import { BookAdd } from './cmps/BookAdd.jsx';
import { EventBusService } from '../../services/EventBusService.js'
import { BookFilter } from "../Apps/BookApp/cmps/BookFilter.jsx";

export class BookApp extends React.Component {

    state = {
        books: [],
        filterBy: { fromPrice: 0, toPrice: 1000, title: '' }
    }

    componentDidMount() {
        this.unsubscribe = EventBusService.on('success', () => {
            swal("Good job!", "You added a book!", "success");
        });
            this.unsubscribeOnFiter = EventBusService.on('filterBy', (value) => {
                this.getBookForDisplay(value)
            });

        this.loadBooks()
    }



    componentWillUnmount() {
        this.unsubscribe();
        this.unsubscribeOnFiter()
    }

    loadBooks = () => {
        BooksService.query().then((books) => {
            this.setState({ books })
        })
    }
   


    getBookForDisplay = (filter) => {
        this.setState({ filterBy: filter });
        const { filterBy } = this.state;
        const books = BooksService.filterBy(filterBy)
        this.setState({books})
    };

    render() {
        return (
            <section className="BookApp">
                <BookAdd callBack={this.loadBooks} />
                <BookList books={this.state.books} />

            </section>
        )
    }
}