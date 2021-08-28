import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { Property } from '../../../app/models/property';

interface Props {
    property: Property;
    cancelSelectProperty: () => void;
    openForm: (id: string) => void;
}
export default function PropertyDetails({property, cancelSelectProperty, openForm}: Props) {
    return (

        <Card>
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
                <Button onClick={cancelSelectProperty} basic color='grey' content='Cancel' />
            </Button.Group>
        </Card.Content>
      </Card>
    )
}