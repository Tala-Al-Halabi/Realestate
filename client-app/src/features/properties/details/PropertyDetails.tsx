import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export default observer( function PropertyDetails() {
  const {propertyStore} = useStore();
  const {selectedProperty: property, loadProperty, loadingInitial} = propertyStore;
  const {id} = useParams<{id: string}>();

  useEffect(() => {
    if (id) loadProperty(id);
    }, [id, loadProperty]);

  if(loadingInitial || !property) return <LoadingComponent />;
    return (

        <Card fluid>
        <Image src={`/assets/categoryImages/${property.location}.jpg`} />
        <Card.Content>
          <Card.Header>{property.title}</Card.Header>
          <Card.Meta>
            <span>{property.pDate}</span>
          </Card.Meta>
          <Card.Description>
            {property.about}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button.Group widths='2'>
                <Button as={Link} to={`/manage/${property.id}`} basic color='blue' content='Edit' />
                <Button as={Link} to='/properties' basic color='grey' content='Cancel' />
            </Button.Group>
        </Card.Content>
      </Card>
    )
})