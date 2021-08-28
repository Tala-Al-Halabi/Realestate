import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Property } from '../models/property';
import NavBar from './NavBar';
import PropertyDashboard from '../../features/properties/dashboard/PropertyDashboard';
import {v4 as uuid} from 'uuid';
function App() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {

    axios.get<Property[]>('http://localhost:5000/api/Properties').then(response => {
      setProperties(response.data);
    })
  }, [])

  function handleSelectProperty(id: string){
    setSelectedProperty(properties.find(x => x.id === id));
  }

  function handleCancelSelectProperty() {
    setSelectedProperty(undefined);
  }

  function handleFormOpen(id?: string){
    id ? handleSelectProperty(id) : handleCancelSelectProperty();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }
  
  function handleCreate0rEditProperty(property: Property) {
    property.id
      ? setProperties([...properties.filter(x => x.id !==property.id), property])
      : setProperties([...properties,{...property, id: uuid()}]);
    setEditMode(false);
    setSelectedProperty(property);
  }

  function handleDeleteProperty(id: string) {
    setProperties([...properties.filter(x => x.id !== id)])
  }



  return (
    <>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop: '7em'}}>
        <PropertyDashboard 
        properties={properties} 
        selectedProperty={selectedProperty}
        selectProperty={handleSelectProperty}
        cancelSelectProperty={handleCancelSelectProperty}
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}
        create0rEdit={handleCreate0rEditProperty}
        deleteProperty={handleDeleteProperty}

        />
      </Container>  
    </>
  );
}

export default App;
