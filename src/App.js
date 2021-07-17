import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Switch } from 'react-router-dom'

import SearchBook from './SearchBook'
import BookList from './BookList'
import NoMatch from './NoMatch'

class BooksApp extends React.Component {
  async componentDidMount() {
    const books = await BooksAPI.getAll()
    this.setState({ allBookList: books })
  }

  state = {
    allBookList: [],
  }

  updateShelf = (shelfvalue, book) => {
    const { allBookList } = this.state
    var priviousShelf = book.shelf

    BooksAPI.update(book, shelfvalue).then((res) => {
      let allBookReadTempList = allBookList
      let newUpdated
      if (priviousShelf === undefined || priviousShelf === 'None') {
        book.shelf = shelfvalue
        let tempBookList = allBookList
        newUpdated = { ...allBookList, book }
      } else {
        book.shelf = shelfvalue

        newUpdated = { ...allBookList, ...book }
      }

      this.setState({ newUpdated })
      BooksAPI.getAll().then((data) => {
        this.setState({ allBookList: data })
      })
    })
  }

  render() {
    const { allBookList } = this.state
    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <BookList
                updateShelf={this.updateShelf}
                allBookLists={allBookList}
              />
            )}
          />
          <Route
            exact
            path="/search"
            render={() => (
              <SearchBook
                updateShelf={this.updateShelf}
                allBookList={allBookList}
              />
            )}
          />
          <Route component={NoMatch} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
