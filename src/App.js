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
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    allBookList: [],
  }

  updateShelf = (shelfvalue, book) => {
    const { allBookList } = this.state
    var priviousShelf = book.shelf
    //   console.log('Privious Shelf ' + book.shelf)
    //   console.log('Next Shelf ' + book.shelf)

    BooksAPI.update(book, shelfvalue).then((res) => {
      let allBookReadTempList = allBookList
      /*allBookReadTempList.map((item) =>
        item.id === book.id ? (item.shelf = shelfvalue) : '',
      )*/
      let newUpdated
      if (priviousShelf === undefined || priviousShelf === 'None') {
        book.shelf = shelfvalue
        let tempBookList = allBookList
        //        tempBookList.push(book)
        newUpdated = { ...allBookList, book }
      } else {
        book.shelf = shelfvalue

        newUpdated = { ...allBookList, ...book }
      }

      //   console.log('Updating Book ' + JSON.stringify(allBookReadTempList))

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
