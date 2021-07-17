import React from 'react'
import './App.css'

import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import _, { forEach } from 'lodash'
import Book from './Book'

class SearchBook extends React.Component {
  state = {
    searchedText: '',
    searchedBookResult: [],
  }
  onSearchText = (value) => {
    this.setState({ searchedText: value })

    this.callSearch(value)
  }
  callSearch = _.debounce(async (value) => {
    try {
      if (value) {
        BooksAPI.search(value).then((data) => {
          if (data && data.length > 0) {
            this.setState({ searchedBookResult: data })
          } else {
            this.setState({ searchedBookResult: [] })
          }
        })
      } else {
        this.setState({ searchedBookResult: [] })
      }
    } catch (err) {
      this.setState({ searchedBookResult: [] })
    }
  }, 1000)

  onChangeShelf = (value, book) => {
    const { searchedBookResult } = this.state
    const { updateShelf } = this.props
    let allBookReadTempList = searchedBookResult
    allBookReadTempList.map((item) =>
      item.id === book.id ? (item.shelf = value) : '',
    )
    this.setState({ searchedBookResult: allBookReadTempList })

    updateShelf(value, book)
  }

  render() {
    const { searchedBookResult } = this.state

    const { allBookList } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={this.state.searchedText}
              onChange={(e) => {
                this.onSearchText(e.target.value)
              }}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchedBookResult &&
              searchedBookResult.map((book) => {
                let bookOnShelf = allBookList.find((b) => b.id === book.id)
                if (bookOnShelf) {
                  book.shelf = bookOnShelf.shelf
                } else {
                  book.shelf = book.shelf ? book.shelf : 'none'
                }
                return (
                  <li key={book.id}>
                    <Book book={book} onChangeShelf={this.onChangeShelf} />
                  </li>
                )
              })}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBook
