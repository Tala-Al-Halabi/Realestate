import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid} from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import PropertyDetailedInfo from './PopertyDetailedInfo';
import PropertyDetailedChat from './PropertyDetailedChat';
import PropertyDetailedHeader from './PropertyDetailedHeader';
import PropertyDetailedSidebar from './PropertyDetailedSidebar';

export default observer( function PropertyDetails() {
  const {propertyStore} = useStore();
  const {selectedProperty: property, loadProperty, loadingInitial} = propertyStore;
  const {id} = useParams<{id: string}>();

  useEffect(() => {
    if (id) loadProperty(id);
    }, [id, loadProperty]);

  if(loadingInitial || !property) return <LoadingComponent />;
    return (

       <Grid>
         <Grid.Column width={10}>
           <PropertyDetailedHeader property={property} />
           <PropertyDetailedInfo property={property} />
           <PropertyDetailedChat />
         </Grid.Column>
         <Grid.Column width={6}>
           <PropertyDetailedSidebar />
         </Grid.Column>
       </Grid>
    )
})