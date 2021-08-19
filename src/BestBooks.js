import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button'

class MyFavoriteBooks extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      books: {},
    }
  }

  makeBookRequest = async () => {

    // Get your Token for us.
    // Will learn more in 401
    const { getIdTokenClaims } = this.props.auth0;
    let tokenClaims = await getIdTokenClaims();
    const jwt = tokenClaims.__raw;

    // DONE
    console.log('jwt: ', jwt);

    const config = {
      headers: { "Authorization": `Bearer ${jwt}` },
    }
    const mongoDBResponse = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/books`, config);

    // DONE
    console.log('it worked if data:  ', mongoDBResponse);

    this.setState({
      books: mongoDBResponse,
    })
  }
  render() {


    return(
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
          {/* {this.makeBookRequest()} */}
          <Button
            variant="primary"
            size="lg"
            block
            onClick={this.makeBookRequest}
          > 
          Request that Server Goodness
          </Button>
        </p>
      </Jumbotron>
    )
  }
}

export default MyFavoriteBooks;
