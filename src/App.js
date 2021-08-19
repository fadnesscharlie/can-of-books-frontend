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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      working: '',
    }
  }

  componentDidMount = async () => {
    const results = await axios.get('http://localhost:3001/books');
    console.log('response from component did mount ', results.data);
    this.setState({
      books: results,
    })
  }

  makeRequest = async () => {

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
    const serverResponse = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/test`, config);

    // DONE
    console.log('it worked if data:  ', serverResponse);

    this.setState({
      working: `This is working: ${serverResponse.data.email_verified}`,
    })
  }

  render() {
    console.log('app', this.props);

    // Object Destructure
    const { user, isLoading, isAuthenticated } = this.props.auth0;

    console.log('state:',this.state);

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
                  {/* DONE: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}

                  {isAuthenticated ?
                    <>
                      <BestBooks />
                      <Profile user={user}/>
                    </> :
                    <Login />}

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
                  {this.state.working}

                </Route>
                <Route exact path="/profile">
                  {/* DONE: add a route with a path of '/profile' that renders a `Profile` component */}
                  <Profile />
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
