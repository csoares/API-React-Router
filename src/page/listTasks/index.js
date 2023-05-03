import React from "react";
import CreateTask from "../../components/createTask";
import { Table } from "react-bootstrap";

export default class ListTasks extends React.Component {
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
