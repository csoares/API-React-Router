import React from "react";

import { Button, Form } from "react-bootstrap";

export default class CreateTask extends React.Component {
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
