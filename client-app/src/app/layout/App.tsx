import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import PropertyDashboard from '../../features/properties/dashboard/PropertyDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {propertyStore} = useStore();

  useEffect(() => {
    propertyStore.loadProperties();
    }, [propertyStore])

  if(propertyStore.loadingInitial) return <LoadingComponent content='Loading app' />



  return (
    <>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <PropertyDashboard />
      </Container>  
    </>
  );
}

export default observer(App);
