import React from 'react';
import { Container, Button, ListGroup } from 'react-bootstrap';

class Book extends React.Component {
  render() {
    return(
      <Container>
        <ListGroup>
          {this.props.books.length ? 
          this.props.books.map(book => {
            return <ListGroup.Item key={book._id}>
              <h3>{book.title} Will add a Delete button too</h3>
              <Button onClick={()=> this.props.handleDelete(book._id)}>Delete</Button>
            </ListGroup.Item>
          })
          : ''}
        </ListGroup>
      </Container>
    );
  }
}

export default Book;
