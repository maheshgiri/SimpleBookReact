import React from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import Book from './Book'

const SHELVES = [
  {
    title: 'Currently Reading',
    id: 'currentlyReading',
  },
  {
    title: 'Want To Read',
    id: 'wantToRead',
  },
  {
    title: 'Read',
    id: 'read',
  },
]
class BookList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      readedBookList: [],
      wantToReadBookList: [],
      currentlyReadingBookList: [],
    }
  }

  getDerivedStateFromProps(props, state) {}

  componentDidUpdate() {}

  componentDidMount() {
    const { updateShelf, allBookLists } = this.props
  }

  render() {
    const { updateShelf, allBookLists } = this.props
    let currentlyReadingBookList = [],
      wantToReadBookList = [],
      readedBookList = []

    if (allBookLists && allBookLists.length > 0) {
      currentlyReadingBookList = allBookLists.filter(
        (book) => book.shelf === 'currentlyReading',
      )
      wantToReadBookList = allBookLists.filter(
        (book) => book.shelf === 'wantToRead',
      )
      readedBookList = allBookLists.filter((book) => book.shelf === 'read')
    }

    const onChangeShelf = (value, book) => {
      updateShelf(value, book)
    }

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {currentlyReadingBookList.map((book) => (
                    <li key={book.id}>
                      <Book book={book} onChangeShelf={onChangeShelf} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {wantToReadBookList.map((book) => (
                    <li key={book.id}>
                      <Book book={book} onChangeShelf={onChangeShelf} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {readedBookList.map((book) => (
                    <li key={book.id}>
                      <Book book={book} onChangeShelf={this.onChangeShelf} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BookList
