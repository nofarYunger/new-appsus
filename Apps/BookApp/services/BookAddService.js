import { StorageService } from '../../../services/StorageService.js'

export const BookAddService = {
    query,
    findOpt
}
const GOOGLE_KEY = 'gGoogleBooksDB'
var gGoogleBooks;

_getBooksFromGoogle()

function query() {
    gGoogleBooks = StorageService.load(GOOGLE_KEY)
    console.log('query', gGoogleBooks);
    return Promise.resolve(gGoogleBooks)
}

function findOpt(key) {
    console.log(key);
    const filterRegex = new RegExp(key, 'i');
    var options = gGoogleBooks.items.filter(book => {
        return filterRegex.test(book.volumeInfo.title)
    })
    return Promise.resolve(options)
}


function _getBooksFromGoogle() {
    gGoogleBooks = StorageService.load(GOOGLE_KEY)
    if (!gGoogleBooks) {
        const url = 'https://www.googleapis.com/books/v1/volumes?printType=books&q=effective%20javascript'
        axios.get(url)
            .then(res => res.data)
            .then(books => {
                StorageService.save(GOOGLE_KEY, books)
                return books
            })
            .then(books => {
                gGoogleBooks = books
                console.log('axios', gGoogleBooks)
            })
    }
}