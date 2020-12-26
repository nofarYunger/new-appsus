import { BookPreview } from './BookPreview.jsx'


export function BookList({ books}) {

    return (
        <div className="BookList grid-box">
            { books.map(book => {
                return <BookPreview key={book.id} book={book}  />;
            })}
        </div>
    );
}