import React, { useState, useEffect } from "react";
import CreateTask from "../../components/createTask";
import { Table } from "react-bootstrap";

const ListTasks = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const addAnItem = (person) => {
    setItems((previousState) => [...previousState, person]);
    console.log("add");
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (items.length) {
    return (
      <div>
        <CreateTask foo={addAnItem} />
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
};

export default ListTasks;
