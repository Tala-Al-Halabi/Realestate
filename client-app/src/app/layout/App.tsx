import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Property } from '../models/property';
import NavBar from './NavBar';
import PropertyDashboard from '../../features/properties/dashboard/PropertyDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
function App() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {

    agent.Properties.list().then(response => {
      let properties: Property[] = [];
      response.forEach(property => {
        property.pDate = property.pDate.split('T')[0];
        properties.push(property);
      })
      setProperties(properties);
      setLoading(false);
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
    setSubmitting(true);
    if (property.id){
      agent.Properties.update(property).then(() => {
        setProperties([...properties.filter(x => x.id !==property.id), property])
        setSelectedProperty(property);
        setEditMode(false);
        setSubmitting(false);
      })
    } else{
      property.id = uuid();
      agent.Properties.create(property).then(() => {
        setProperties([...properties, property])
        setSelectedProperty(property);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }

  function handleDeleteProperty(id: string) {
    setSubmitting(true);
    agent.Properties.delete(id).then(() => {
      setProperties([...properties.filter(x => x.id !== id)]);
      setSubmitting(false);
    })
    setProperties([...properties.filter(x => x.id !== id)])
  }

  if(loading) return <LoadingComponent content='Loading app' />



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
        submitting={submitting}

        />
      </Container>  
    </>
  );
}

export default App;
