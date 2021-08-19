import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel'
import Card from 'react-bootstrap/Card'
import { withAuth0 } from '@auth0/auth0-react';

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      displayBooks: false,
    }
  }

  componentDidMount = async () => {

    // Get your Token for us.
    // Will learn more in 401
    const { getIdTokenClaims } = this.props.auth0;
    let tokenClaims = await getIdTokenClaims();
    const jwt = tokenClaims.__raw;

    // DONE
    // console.log('jwt books: ', jwt);

    const config = {
      headers: { "Authorization": `Bearer ${jwt}` },
    }
    const mongoDBResponse = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/books`, config);

    // DONE
    // console.log('it worked if data:  ', mongoDBResponse.data);

    this.setState({
      books: mongoDBResponse.data,
      displayBooks: true,
    })
  }
  
  render() {
    let bookRender = this.state.books.map((info, idx) => {
      return (
        <Carousel.Item key={idx}>
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
        <Carousel>
          {this.state.displayBooks ? bookRender : ''}
        </Carousel>
      </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
