import React, { useReducer } from 'react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import BestBooks from './BestBooks.js';
import Profile from './Profile.js'
import { withAuth0 } from '@auth0/auth0-react';
import Login from './Login.js';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
// import Modal from 'react-bootstrap/Modal'
import BookForm from './BookForm.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      working: '',
      books: [],
      show: false,
      setShow: false,
    }
  }

  makeRequest = async () => {
    // Get your Token for us.
    // Will learn more in 401
    const { getIdTokenClaims } = this.props.auth0;
    let tokenClaims = await getIdTokenClaims();
    const jwt = tokenClaims.__raw;
    const config = {
      headers: { "Authorization": `Bearer ${jwt}` },
    }
    const serverResponse = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/test`, config);

    this.setState({
      working: `This is working: ${serverResponse.data.email_verified}`,
    })
  }

  handleCreate = async (bookInfo) => {
    console.log('bookInfo: ', bookInfo)
    try {
      let response = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/post-books`, bookInfo);
      const newBook = response.data;
      console.log('Data from handle Create Function', newBook)
      this.setState({
        // makes sure to save previous books along with new books
        books: [...this.state.books, newBook],
      })
    } catch (err) {
      console.log(err)
    }
  }

  handleDelete = async (id) => {
    console.log('id', id)
    try {
      const { getIdTokenClaims } = this.props.auth0;
      let tokenClaims = await getIdTokenClaims();
      const jwt = tokenClaims.__raw;
      const config = {
        headers: { "Authorization": `Bearer ${jwt}` },
      }
      await axios.delete(`${process.env.REACT_APP_BACKEND_SERVER}/delete-books/${id}`, config)
      let remainingbooks = this.state.books.filter(book => book._id !== id);
      this.setState({
        books: remainingbooks,
      })
      console.log(this.state.books)
    } catch (err) {
      console.log('Delete function failing: ', err)
    }
  }

  handleClose = () => this.setState({ show: false });

  handleShow = () => this.setState({ show: true });
  // handleShow = () => console.log('handleSHow working');

  updateBooks = () => this.setState({ books: this.state.books});
  render() {
    // Object Destructure
    const { user, isLoading, isAuthenticated } = this.props.auth0;

    if (isLoading) {
      return <h2>Loading please wait...</h2>
    } else {
      return (
        <>
          <Router>
            <IsLoadingAndError>
              <Header />
              <Switch>
                <Route exact path="/">

                  {isAuthenticated ?
                    <>
                      <BestBooks handleDelete={this.handleDelete} updateBooks={this.updateBooks}/>
                    </> :
                    <Login />}

                  {this.state.working}

                  <BookForm handleCreate={this.handleCreate} handleClose={this.handleClose} handleShow={this.handleShow} show={this.state.show}/>

                  {user ? <>
                    <h2>{user.name}</h2>
                    <Button
                      variant="primary"
                      size="lg"
                      block
                      onClick={this.makeRequest}
                    >
                      Request that Server Goodness
                    </Button>
                  </> : ''}
                </Route>
                <Route exact path="/profile">
                  <Profile user={user} />
                </Route>
              </Switch>
              <Footer />
            </IsLoadingAndError>
          </Router>
        </>
      );
    }
  }
}

export default withAuth0(App);
