import React from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Property } from "../../../app/models/property";

interface Props {
    properties: Property[];
    selectProperty: (id: string) => void;
    deleteProperty: (id: string) => void;
}


export default function PropertyList({properties, selectProperty, deleteProperty}: Props) {
    return(
        <Segment>
            <Item.Group divided>
                {properties.map(property => (
                    <Item key={property.id}>
                        <Item.Content>
                            <Item.Header as='a'>{property.title}</Item.Header>
                            <Item.Meta>{property.pDate}</Item.Meta>
                            <Item.Description>
                                <div>{property.about}</div>
                                <div>{property.location}, {property.price}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectProperty(property.id)} floated='right' content='View' color='blue' />
                                <Button onClick={() => deleteProperty(property.id)} floated='right' content='Delete' color='red' />
                                <Label basic content={property.iType}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}

            </Item.Group>
        </Segment>


    )
}