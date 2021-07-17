import React from 'react'
import './App.css'

import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import _, { forEach } from 'lodash'

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

  onChangeShelf = (e, book) => {
    const { searchedBookResult } = this.state
    const { updateShelf } = this.props
    let allBookReadTempList = searchedBookResult
    allBookReadTempList.map((item) =>
      item.id === book.id ? (item.shelf = e.target.value) : '',
    )
    this.setState({ searchedBookResult: allBookReadTempList })

    updateShelf(e.target.value, book)
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
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
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
                    <div className="book">
                      <div className="book-top">
                        <div
                          className="book-cover"
                          style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${
                              book.imageLinks && book.imageLinks.thumbnail
                            })`,
                          }}
                        ></div>
                        <div className="book-shelf-changer">
                          <select
                            value={book.shelf}
                            onChange={(e) => {
                              this.onChangeShelf(e, book)
                            }}
                          >
                            <option value="move" disabled>
                              Move to...
                            </option>
                            <option value="currentlyReading">
                              Currently Reading
                            </option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">
                        {book.authors && book.authors.join(',')}
                      </div>
                    </div>
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
