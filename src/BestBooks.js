import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel'
import Card from 'react-bootstrap/Card'
import { withAuth0 } from '@auth0/auth0-react';
import Books from './Books.js';
import BookForm from './BookForm.js';
import Button from 'react-bootstrap/Button'

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      displayBooks: false,
      show: false,
      setShow: false,
      user: {},
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
  } catch (error) {
    console.log('componentDidMount' , error)
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

      if (user.email === this.state.books[0].email){
        await axios.delete(`${process.env.REACT_APP_BACKEND_SERVER}/delete-books/${id}`, config)
      }
      let remainingbooks = this.state.books.filter(book => book._id !== id);
      this.setState({
        books: remainingbooks,
      })
      console.log('Books array',this.state.books)
    } catch (err) {
      console.log('Delete function failing: ', err)
    }
  }

  handleClose = () => this.setState({ show: false });

  handleShow = () => this.setState({ show: true });
  
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
              onClick={()=> this.handleDelete(info._id)}
              >Delete</Button>
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
            This is a collection of my favorite books
          </p>
        </Jumbotron>
        <BookForm 
        user={this.state.user}
        handleCreate={this.handleCreate} 

        // Functions
        handleClose={this.handleClose} 
        handleShow={this.handleShow} 

        // State
        show={this.state.show}
        />
        <Carousel>
          {this.state.displayBooks ? bookRender : ''}
        </Carousel>
        {/* <Books books={this.state.books} handleDelete={this.handleDelete} /> */}
      </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
