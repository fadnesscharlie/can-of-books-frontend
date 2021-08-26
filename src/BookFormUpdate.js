import React from 'react';
import { Container, Button, Form, Modal } from 'react-bootstrap';

class BookFormUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.selectedBook._id,
      title: this.props.selectedBook.title,
      description: this.props.selectedBook.description,
      status: this.props.selectedBook.status,
      email: this.props.user.email,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleUpdate( this.state );
    this.props.handleCloseUpdate()
  }

  handleTitle = (e) => {
    e.preventDefault();
    this.setState({title: e.target.value })
  }
  handleDescription = (e) => {
    e.preventDefault();
    this.setState({description: e.target.value })
  }
  handleStatus = (e) => {
    e.preventDefault();
    this.setState({status: e.target.value })
  }
  render() {
    console.log(this.state);
    return (
      <>
        <Modal show={this.props.showUpdate} onHide={this.props.handleCloseUpdate}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>

              <Form onSubmit={this.handleSubmit}>
                <Form.Label>
                  <h2>Update a New Book</h2>
                </Form.Label>

                <Form.Group controlId="title">
                  <Form.Label>Cat Name</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.handleTitle}
                    value={this.state.title}
                  />
                </Form.Group>
                <Form.Group controlId="description">
                  <Form.Label>Cat Description</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.handleDescription}
                    value={this.state.description}
                  />
                </Form.Group>

                <Form.Group controlId="status">
                  <Form.Label>Cat Status</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.handleStatus}
                    value={this.state.status}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  // onClick={this.props.handleCloseUpdate}
                >Submit</Button>
              </Form>

            </Container>

          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="secondary" onClick={this.props.handleCloseUpdate}>
              Close
            </Button> */}
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default BookFormUpdate;
