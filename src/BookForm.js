import React from 'react';
import { Container, Button, Form, Modal } from 'react-bootstrap';

class BookForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    let title = e.target.title.value;
    let description = e.target.description.value;
    let status = e.target.status.value;
    let email = e.target.email.value;
    this.props.handleCreate({ title, description, status, email });
  }

  render() {

    return (
      <>
        <Button variant="primary" onClick={this.props.handleShow}>
          Add a Book
        </Button>

        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>

            <Form onSubmit={this.handleSubmit}>
              <Form.Label>
                <h2>Add a New Book</h2>
              </Form.Label>

              <Form.Group controlId="title">
                <Form.Label>Cat Name</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Cat Description</Form.Label>
                <Form.Control type="text" />
              </Form.Group>

              <Form.Group controlId="status">
                <Form.Label>Cat Status</Form.Label>
                <Form.Control type="text" />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Cat Email</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Button type="submit">Submit</Button>
            </Form>

            </Container>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.props.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
    // return (
    //   <Container>
    //     <Form onSubmit={this.handleSubmit} >
    //       <Form.Label>
    //         <h2>Add a New Book</h2>
    //       </Form.Label>

    //       <Form.Group controlId="title">
    //         <Form.Label>Cat Name</Form.Label>
    //         <Form.Control type="text" />
    //       </Form.Group>

    //       <Form.Group controlId="description">
    //         <Form.Label>Cat Description</Form.Label>
    //         <Form.Control type="text" />
    //       </Form.Group>

    //       <Form.Group controlId="status">
    //         <Form.Label>Cat Status</Form.Label>
    //         <Form.Control type="text" />
    //       </Form.Group>

    //       <Form.Group controlId="email">
    //         <Form.Label>Cat Email</Form.Label>
    //         <Form.Control type="text" />
    //       </Form.Group>
    //       <Button type="submit">Submit</Button>

    //     </Form>
    //   </Container>
    // );
  }
}

export default BookForm;
