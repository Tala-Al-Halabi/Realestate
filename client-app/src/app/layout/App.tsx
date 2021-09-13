import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import PropertyDashboard from '../../features/properties/dashboard/PropertyDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import PropertyForm from '../../features/properties/form/PropertyForm';
import PropertyDetails from '../../features/properties/details/PropertyDetails';
import HomePage from '../../features/home/HomePage';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';

 function App() {
   const location = useLocation();

  return (
    <>
    <ToastContainer position='bottom-right' hideProgressBar />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
          <NavBar />
          <Container style={{marginTop: '7em'}}>
            <Switch>
            <Route exact path='/properties' component={PropertyDashboard} />
            <Route path='/properties/:id' component={PropertyDetails} />
            <Route key={location.key} path={['/createProperty', '/manage/:id']} component={PropertyForm} />
            <Route path='/errors' component={TestErrors} />
            <Route path='/server-error' component={ServerError} />
            <Route component={NotFound}/>
            </Switch>
          </Container>  
          </>

        )}      
      /> 
    </>
  );
}

export default observer(App);