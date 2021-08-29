import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export default function PropertyDetails() {
  const {propertyStore} = useStore();
  const {selectedProperty: property, openForm, cancelSelectedProperty} = propertyStore;

  if(!property) return <LoadingComponent />;
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
                <Button onClick={() => openForm(property.id)} basic color='blue' content='Edit' />
                <Button onClick={cancelSelectedProperty} basic color='grey' content='Cancel' />
            </Button.Group>
        </Card.Content>
      </Card>
    )
}