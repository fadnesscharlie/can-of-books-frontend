import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel'
import Card from 'react-bootstrap/Card'
import { withAuth0 } from '@auth0/auth0-react';
import BookForm from './BookForm.js';
import BookFormUpdate from './BookFormUpdate.js';
import Button from 'react-bootstrap/Button'

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      displayBooks: false,
      show: false,
      showUpdate: false,
      setShow: false,
      user: {},
      selectedBook: null,
    }
  }

  componentDidMount = async () => {
    try {
      // Grabbing Token from Auth0
      const { getIdTokenClaims, user } = this.props.auth0;
      let tokenClaims = await getIdTokenClaims();
      const jwt = tokenClaims.__raw;

      const config = {
        headers: { "Authorization": `Bearer ${jwt}` },
        // Setting Parameter for email to pass into the backend
        params: { email: user.email }
      }
      const mongoDBResponse = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/books`, config);

      this.setState({
        books: mongoDBResponse.data,
        // updating user to pass into BookForm
        user: user,
        displayBooks: true,
      })
      console.log('Book Array', this.state.books);
    } catch (error) {
      console.log('componentDidMount', error)
    }
  }

  handleCreate = async (bookInfo) => {
    console.log('bookInfo: ', bookInfo)
    try {
      let response = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/post-books`, bookInfo);
      const newBook = response.data;
      console.log('Data from handle Create Function: ', newBook)
      this.setState({
        // makes sure to save previous books along with new books
        books: [...this.state.books, bookInfo],
      })

    } catch (err) {
      console.log(err)
    }
  }

  handleDelete = async (id) => {
    console.log('id', id)
    try {
      const { getIdTokenClaims, user } = this.props.auth0;
      let tokenClaims = await getIdTokenClaims();
      const jwt = tokenClaims.__raw;
      const config = {
        headers: { "Authorization": `Bearer ${jwt}` },
      }

      // If the users email matches the book email
      if (user.email === this.state.books[0].email) {
        await axios.delete(`${process.env.REACT_APP_BACKEND_SERVER}/delete-books/${id}`, config)
      }
      let remainingbooks = this.state.books.filter(book => book._id !== id);
      this.setState({
        books: remainingbooks,
      })
      console.log('Books array', this.state.books)
    } catch (err) {
      console.log('Delete function failing: ', err)
    }
  }

  // Takes in the book object from state in the Update Form
  handleUpdate = async (book) => {
    try {
      // Calling the backend to update our book with the Id and passed through book update
      await axios.put(`${process.env.REACT_APP_BACKEND_SERVER}/update-books/${book._id}`, book);

      // Returns the array of books with either new or old book
      const updateBooks = this.state.books.map(stateBook => {
        if (stateBook._id === book._id) {
          // Returns the new updated book
          return book;
        } else {
          // Returns the old book if not updated
          return stateBook;
        }
      })
      this.setState({ books: updateBooks });
    } catch (error) {
      console.log('Update function failing: ', error)
    }
  }

  // Add a book, Updating State
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  // Updating a book, Updating State
  handleCloseUpdate = () => this.setState({ showUpdate: false });
  handleShowUpdate = (book) => {
    this.setState({
      showUpdate: true,
      selectedBook: book,
    })
  };

  render() {
    let bookRender = this.state.books.map(info => {
      return (
        <Carousel.Item key={info._id}>
          <Card border="primary" style={{ width: '18rem' }}>
            <Card.Header>{info.title}</Card.Header>
            <Card.Body>
              <Card.Title>{info.email}</Card.Title>
              <Card.Text>
                {info.description}
              </Card.Text>
              <Card.Text>
                {info.status}
              </Card.Text>

              <Button
                onClick={() => this.handleShowUpdate(info)}
              >Click here to update</Button>

              {this.state.showUpdate ?
                <BookFormUpdate
                  // Functions
                  handleUpdate={this.handleUpdate}
                  handleCloseUpdate={this.handleCloseUpdate}

                  // State
                  user={this.state.user}
                  showUpdate={this.state.showUpdate}
                  selectedBook={this.state.selectedBook}
                />
              : ''}

              <Button
                onClick={() => this.handleDelete(info._id)}
              >Click here to delete</Button>
            </Card.Body>
          </Card>
        </Carousel.Item>
      )
    })

    return (
      <>
        <Jumbotron>
          <h1>My Favorite Books</h1>
          <p>
            This is a collection of your favorite books
          </p>
        </Jumbotron>
        <BookForm
          // Functions
          handleCreate={this.handleCreate}
          handleClose={this.handleClose}
          handleShow={this.handleShow}

          // State
          user={this.state.user}
          show={this.state.show}
        />
        <Carousel>
          {this.state.displayBooks ? bookRender : ''}
        </Carousel>
      </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
