import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  Table,
  Container,
  Row,
  Col,
  Button,
  Form,
  Navbar,
  Nav,
} from "react-bootstrap";

import About from "./About";
class CreateTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", username: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log(event);
    //TODO7: when we change the content of the input we need to update the state of name or username
    if (event.target.name === "name")
      this.setState({ name: event.target.value });
    else this.setState({ username: event.target.value });
  }

  handleSubmit(event) {
    // TODO8: do a post to create a new event, we will only pass the username and name (other fields are optional)
    const { name, username } = this.state;
    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        name: name,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("response not ok");
        }
        return response.json();
      })
      .then((json) => {
        console.log(json);
        alert("successfully created");
      })
      .catch((error) => {
        alert(error);
      });

    let person = {
      id: Math.floor(Math.random() * 999) + 1, // generate a random id - this is only for testing purposes
      name: name,
      username: username,
      email: "Sincere@april.biz",
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
    };
    //TODO9: for this API you do not need to send everything - call the addAnItem function from the ListTask Component
    this.props.foo(person);
    // since it is a form - you should prevent the submit effect
    event.preventDefault();
  }
  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Name: </Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Username:</Form.Label>

            <Form.Control
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}
class ListTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
    // TODO10: bind the addAnItem function to this
    this.addAnItem = this.addAnItem.bind(this);
  }
  addAnItem(person) {
    this.setState((previousState) => ({
      items: [...previousState.items, person],
    }));
    console.log("add");
  }

  componentDidMount() {
    //TODO2: do a fetch to https://jsonplaceholder.typicode.com/users using Get
    // you should chain through parseData, and loadDataItems if any error happen send to anyErrorFetching

    fetch("https://jsonplaceholder.typicode.com/users")
      .then(this.parseData)
      .then((result) => this.loadDataToItems(result))
      .catch((error) => this.anyErrorFetching(error));
  }

  parseData(response) {
    return response.json();
  }

  loadDataToItems(data) {
    // TODO3: change the state using data
    this.setState({ isLoaded: true, items: data });
  }

  anyErrorFetching(error) {
    // TODO4: change the state using data
    this.setState({ isLoaded: true, error: error });
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else if (items.length) {
      return (
        <div>
          {/* TODO6: pass the addAnItem function to the other component */}
          <CreateTask foo={this.addAnItem} />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Website</th>
              </tr>
            </thead>
            <tbody>
              {/* TODO5: foreach item in the state render it in the table*/}
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.website}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      );
    } else {
      return <p>Empty Items list</p>;
    }
  }
}

const Home = () => (
  <div>
    <h1>First react webpage using Jsonplaceholder</h1>
  </div>
);

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/tasks">Tasks</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Container>
            <Row>
              <Col>
                <Route path="/home" component={Home} />
                <Route path="/tasks" component={ListTasks} />
                <Route path="/about" component={About} />
              </Col>
            </Row>
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;
