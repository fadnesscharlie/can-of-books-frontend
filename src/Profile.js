import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

class Profile extends React.Component {
  render() {
    let src = this.props.user.picture;
    return (
      <>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={src} />
          <Card.Body>
            <Card.Title>Welcome {this.props.user.given_name}!!!</Card.Title>
            <Card.Text>
              Profile Summary?
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>First Name: {this.props.user.given_name}</ListGroup.Item>
            <ListGroup.Item>Last Name: {this.props.user.family_name}</ListGroup.Item>
            <ListGroup.Item>Last Updated: {this.props.user.updated_at}</ListGroup.Item>
          </ListGroup>
        </Card>
      </>
    );
  }
}

export default Profile;
