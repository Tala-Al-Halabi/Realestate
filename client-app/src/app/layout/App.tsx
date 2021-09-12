import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import PropertyDashboard from '../../features/properties/dashboard/PropertyDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import PropertyForm from '../../features/properties/form/PropertyForm';
import PropertyDetails from '../../features/properties/details/PropertyDetails';
import HomePage from '../../features/home/HomePage';

 function App() {
   const location = useLocation();

  return (
    <>
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
          <NavBar />
          <Container style={{marginTop: '7em'}}>
            <Route exact path='/properties' component={PropertyDashboard} />
            <Route path='/properties/:id' component={PropertyDetails} />
            <Route key={location.key} path={['/createProperty', '/manage/:id']} component={PropertyForm} />
          </Container>  
          </>

        )}      
      /> 
    </>
  );
}

export default observer(App);