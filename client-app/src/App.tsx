import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import { Header } from 'semantic-ui-react';
import { List } from 'semantic-ui-react';
import './App.css';

function App() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {

    axios.get('http://localhost:5000/api/Properties').then(response => {
      console.log(response);
      setProperties(response.data);
    })
  }, [])

  return (
    <div>
      <Header as='h2' icon='users' content='Properties' />
        <List>
          {properties.map((property: any) => (
            <List.Item key={property.id}>
              {property.title}
            </List.Item>
          ))}
        </List>
    </div>
  );
}

export default App;
