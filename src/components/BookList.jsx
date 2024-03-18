import { Component } from "react";
import SingleBook from "./SingleBook";
import { Col, Form, Row } from "react-bootstrap";
import CommentArea from "./CommentArea";
//child
class BookList extends Component {
  state = {
    searchQuery: "",
  };

  render() {
    return (
      <>
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={4} className="text-center">
            <Form.Group>
              <Form.Control
                type="search"
                placeholder="Cerca un libro"
                value={this.state.searchQuery}
                onChange={(e) => this.setState({ searchQuery: e.target.value })}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3 g-2 justify-content-between">
          <Col xs={8}>
            <Row>
              {this.props.books
                .filter((b) => b.title.toLowerCase().includes(this.state.searchQuery))
                .map((b) => (
                  <Col xs={12} sm={4} key={b.asin}>
                    <SingleBook book={b} />
                  </Col>
                ))}
            </Row>
          </Col>
          <Col xs={3}>
            <CommentArea />
          </Col>
        </Row>
      </>
    );
  }
}

export default BookList;
